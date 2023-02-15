import React, { useEffect, useMemo, useRef, useState } from 'react';

import { getNodeTypeFromClassName, BlockManager } from 'easy-email-core';
import { createPortal } from 'react-dom';
import { getEditorRoot, useEditorContext, useFocusIdx, useHoverIdx, useLazyState } from 'easy-email-editor';
import { awaitForElement } from '@extensions/utils/awaitForElement';

export function HoverTooltip() {
  const { hoverIdx, direction, isDragging } = useHoverIdx();
  const lazyHoverIdx = useLazyState(hoverIdx, 60);
  const { focusIdx } = useFocusIdx();
  const [isTop, setIsTop] = useState(false);
  const { initialized } = useEditorContext();

  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);
  const rootRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (initialized) {
      rootRef.current = getEditorRoot()!.getBoundingClientRect();
    }
  }, [initialized]);

  useEffect(() => {
    const rootBounds = rootRef.current;
    if (!initialized) return;

    if (lazyHoverIdx) {
      const promiseObj = awaitForElement<HTMLDivElement>(lazyHoverIdx);
      promiseObj.promise.then(blockNode => {
        if (rootBounds) {
          const { top } = blockNode.getBoundingClientRect();
          setIsTop(rootBounds.top === top);
        }

        setBlockNode(blockNode);
      });

      return () => {
        promiseObj.cancel();
      };
    } else {
      setBlockNode(null);
    }
  }, [lazyHoverIdx, initialized]);

  const block = useMemo(() => {
    return blockNode
      ? BlockManager.getBlockByType(getNodeTypeFromClassName(blockNode.classList)!)
      : null;
  }, [blockNode]);

  if (focusIdx === hoverIdx && !isDragging) return null;
  if (!block || !blockNode) return null;

  return (
    <>
      {createPortal(
        <div
          id='easy-email-extensions-InteractivePrompt-HoverTooltip'
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <TipNode
            type={isDragging ? 'drag' : 'hover'}
            lineWidth={1}
            title={block.name}
            direction={isTop && direction === 'top' ? 'noEnoughTop' : direction}
            isDragging={isDragging}
          />
        </div>,
        blockNode,
      )}
    </>
  );
}

interface TipNodeProps {
  title: string;
  direction?: string;
  isDragging?: boolean;
  lineWidth: number;
  type: 'drag' | 'hover';
}

function TipNode(props: TipNodeProps) {
  const { direction, title, lineWidth, type } = props;
  const dragTitle = useMemo(() => {
    if (direction === 'top' || direction === 'noEnoughTop') {
      return `${t('Insert before')} ${title}`;
    } else if (direction === 'bottom') {
      return `${t('Insert after')} ${title}`;
    } else if (direction === 'right' || direction === 'left') {
      return t('Drag here');
    }    
    return `${t('Drag to')} ${title}`;
  }, [direction, title]);

  const color = useMemo(() => {
    if (type === 'drag') {
      return 'var(--hover-color)';
    } else {
      return 'var(--hover-color)';
    }
  }, [type]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        fontSize: 14,
        zIndex: 1,
        color: '#000',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        textAlign: 'left',
      }}
    >
      <style>
        {`
        .email-block {
          position: relative;
        }

      `}
      </style>
      {/* outline */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          outlineOffset: `-${lineWidth}px`,
          outline: `${lineWidth}px solid ${color}`,
        }}
      >
        {type === 'hover' && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            <div
              style={{
                backgroundColor: color,
                color: '#ffffff',
                height: '22px',
                lineHeight: '22px',
                display: 'inline-flex',
                padding: '1px 5px',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
                fontFamily: 'sans-serif',
                transform: 'translateY(-100%)',
              }}
            >
              {title}
            </div>
          </div>
        )}
      </div>

      {/* drag direction tip */}
      {props.isDragging && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            ...directionImage[props.direction || 'none'],
          }}
        >
          <div
            style={{
              position: 'absolute',
              color: '#ffffff',
              backgroundColor: color,
              lineHeight: '22px',
              display: 'inline-flex',
              maxWidth: '100%',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              padding: '1px 5px',

              ...positionStyleMap[props.direction || 'none'],
            }}
          >
            {dragTitle}
          </div>
        </div>
      )}
    </div>
  );
}

const positionStyleMap: Record<string, any> = {
  noEnoughTop: {
    top: '0%',
    left: '50%',
    padding: '1px 5px',
    transform: 'translate(-50%, 0%)',
  },
  top: {
    top: '0%',
    left: '50%',
    padding: '1px 5px',
    transform: 'translate(-50%, -50%)',
  },
  bottom: {
    top: '100%',
    left: '50%',
    padding: '1px 5px',
    transform: 'translate(-50%, -50%)',
  },
  left: {
    top: '50%',
    left: '0%',
    padding: '5px 1px',
    writingMode: 'vertical-lr',
    transform: 'translate(0, -50%)',
  },
  right: {
    top: '50%',
    right: '0%',
    padding: '5px 1px',
    writingMode: 'vertical-lr',
    transform: 'translate(0, -50%)',
  },
  none: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const directionImage: Record<string, any> = {
  top: {
    backgroundImage: `linear-gradient(
      to bottom,
      var(--hover-color) 3px ,
      transparent 3px
    )`,
  },
  bottom: {
    backgroundImage: `linear-gradient(
      to top,
      var(--hover-color) 3px ,
      transparent 3px
    )`,
  },
  left: {
    backgroundImage: `linear-gradient(
      to right,
      var(--hover-color) 3px ,
      transparent 3px
    )`,
  },
  right: {
    backgroundImage: `linear-gradient(
      to left,
      var(--hover-color) 3px ,
      transparent 3px
    )`,
  },
  none: {},
};
