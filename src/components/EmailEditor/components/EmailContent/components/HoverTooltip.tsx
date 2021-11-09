import React, { useEffect, useMemo, useState } from 'react';

import { getNodeTypeFromClassName } from '@/utils/block';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { BlocksMap } from '@/components/core/blocks';
import { createPortal } from 'react-dom';
import { awaitForElement } from '@/utils/awaitForElement';
import { styleZIndex } from '@/constants';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function HoverTooltip() {
  const { hoverIdx, direction, isDragging } = useHoverIdx();
  const { focusIdx } = useFocusIdx();

  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hoverIdx) {
      const promiseObj = awaitForElement<HTMLDivElement>(hoverIdx);
      promiseObj.promise.then((blockNode) => {
        setBlockNode(blockNode);
      });

      return () => {
        promiseObj.cancel();
      };
    } else {
      setBlockNode(null);
    }
  }, [hoverIdx]);

  const block = useMemo(() => {
    return blockNode
      ? BlocksMap.findBlockByType(
          getNodeTypeFromClassName(blockNode.classList)!
        )
      : null;
  }, [blockNode]);

  if (focusIdx === hoverIdx && !isDragging) return null;
  if (!block || !blockNode) return null;

  return (
    <>
      {createPortal(
        <TipNode
          type={isDragging ? 'drag' : 'hover'}
          lineWidth={1}
          title={block.name}
          direction={direction}
          isDragging={isDragging}
        />,
        blockNode
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
    if (direction === 'top') {
      return `Insert before ${title}`;
    } else if (direction === 'bottom') {
      return `Insert after ${title}`;
    } else if (direction === 'right' || direction === 'left') {
      return 'Drag here';
    }
    return `Drag to ${title}`;
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
        zIndex: styleZIndex.HOVER_BLOCK_TOOLTIP,
        color: '#000',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        textAlign: 'left',
      }}
    >
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
          <>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                backgroundColor: color,
                color: '#ffffff',
                height: '22px',
                lineHeight: '22px',
                display: 'inline-flex',
                padding: '1px 5px',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
                transform: 'translateY(-100%)',
              }}
            >
              {title}
            </div>
            {/* <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: color,
                opacity: 0.1,
              }}
            /> */}
          </>
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
            // overflow: 'hidden',
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

const positionStyleMap = {
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

const directionImage = {
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
