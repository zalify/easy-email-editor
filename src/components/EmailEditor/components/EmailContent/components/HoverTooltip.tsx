import React, { useEffect, useMemo } from 'react';

import { getNodeTypeFromClassName } from '@/utils/block';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { BlocksMap } from '@/components/core/blocks';
import { useFocusIdx } from 'easy-email-editor';
import { createPortal } from 'react-dom';

export function HoverTooltip() {
  const { hoverIdx, direction, isDragging } = useHoverIdx();
  const { focusIdx } = useFocusIdx();

  const hoverBlock = useMemo(() => {
    if (hoverIdx === focusIdx) return null;
    const blockNode = findBlockNodeByIdx(hoverIdx, true);
    if (!blockNode) return null;
    const block = blockNode
      ? BlocksMap.findBlockByType(
          getNodeTypeFromClassName(blockNode.classList)!
        )
      : null;
    if (!block) return null;

    const positionStyle = {};
    if (direction === 'top') {
    }

    return {
      title: block.name,
      node: blockNode,
      positionStyle,
    };
  }, [direction, focusIdx, hoverIdx]);

  const focusBlock = useMemo(() => {
    const blockNode = findBlockNodeByIdx(focusIdx, true);
    if (!blockNode) return null;
    const block = blockNode
      ? BlocksMap.findBlockByType(
          getNodeTypeFromClassName(blockNode.classList)!
        )
      : null;
    if (!block) return null;

    return {
      title: block.name,
      node: blockNode,
    };
  }, [focusIdx]);

  return (
    <>
      {focusBlock
        ? createPortal(
            <TipNode title={focusBlock.title} lineWidth={2} type='selected' />,
            focusBlock.node
          )
        : null}
      {hoverBlock
        ? createPortal(
            <TipNode
              type={isDragging ? 'drag' : 'hover'}
              lineWidth={1}
              title={hoverBlock.title}
              direction={direction}
              isDragging={isDragging}
            />,
            hoverBlock.node
          )
        : null}
    </>
  );
}

interface TipNodeProps {
  title: string;
  direction?: string;
  isDragging?: boolean;
  lineWidth: number;
  type: 'drag' | 'hover' | 'selected';
}
function TipNode(props: TipNodeProps) {
  const { direction, title, isDragging, lineWidth, type } = props;

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

  const showTitle = useMemo(() => {
    if (direction === 'top' || direction === 'bottom') return false;
    return true;
  }, [direction]);

  const color = useMemo(() => {
    if (type === 'selected') {
      return 'var(--selected-color)';
    } else if (type === 'drag') {
      return 'var(--dragover-color)';
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
        zIndex: 100,
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
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: color,
              opacity: 0.1,
            }}
          />
        )}
      </div>

      {/* title */}
      {showTitle && (
        <div
          style={{
            color: '#ffffff',
            backgroundColor: '#1890ff',
            height: '22px',
            lineHeight: '22px',
            display: 'inline-flex',
            padding: '1px 5px',
            transform: 'translateY(-100%)',
          }}
        >
          {props.title}
        </div>
      )}
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
              backgroundColor: '#1890ff',
              lineHeight: '22px',
              display: 'inline-flex',
              maxWidth: '100%',
              textAlign: 'center',
              whiteSpace: 'nowrap',

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
      var(--dragover-color) 3px ,
      transparent 3px
    )`,
  },
  bottom: {
    backgroundImage: `linear-gradient(
      to top,
      var(--dragover-color) 3px ,
      transparent 3px
    )`,
  },
  left: {
    backgroundImage: `linear-gradient(
      to right,
      var(--dragover-color) 3px ,
      transparent 3px
    )`,
  },
  right: {
    backgroundImage: `linear-gradient(
      to left,
      var(--dragover-color) 3px ,
      transparent 3px
    )`,
  },
  none: {},
};
