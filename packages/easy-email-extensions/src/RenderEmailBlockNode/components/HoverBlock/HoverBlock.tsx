import { BlockManager } from 'easy-email-core';
import { useHoverIdx } from 'easy-email-editor';
import React, { useMemo } from 'react';
import styles from './HoverBlock.module.scss';

interface HoverBlockProps {
  blockType: string;
  idx: string;
}

const HoverBlock = (props: HoverBlockProps) => {
  const { blockType } = props;
  const { direction, isDragging } = useHoverIdx();

  const block = useMemo(() => {
    return BlockManager.getBlockByType(blockType)!;
  }, [blockType]);

  const dragTitle = useMemo(() => {
    if (direction === 'top' || direction === 'noEnoughTop') {
      return `Insert before ${block.name}`;
    } else if (direction === 'bottom') {
      return `Insert after ${block.name}`;
    } else if (direction === 'right' || direction === 'left') {
      return 'Drag here';
    }
    return `Drag to ${block.name}`;
  }, [block.name, direction]);

  return (
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
            outlineOffset: '-1px',
            outline: '1px solid var(--hover-color)',
          }}
        >
          {!isDragging && (
            <>
              <div
                style={{
                  backgroundColor: 'var(--hover-color)',
                  color: '#ffffff',
                  height: '22px',
                  lineHeight: '22px',
                  display: 'inline-flex',
                  padding: '1px 5px',
                  boxSizing: 'border-box',
                  whiteSpace: 'nowrap',
                  transform: 'translateX(-100%)',
                }}
              >
                {block.name}
              </div>
            </>
          )}
        </div>

        {/* drag direction tip */}
        {isDragging && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              ...directionImage[direction || 'none'],
            }}
          >
            <div
              style={{
                position: 'absolute',
                color: '#ffffff',
                backgroundColor: 'var(--hover-color)',
                lineHeight: '22px',
                display: 'inline-flex',
                maxWidth: '100%',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                padding: '1px 5px',

                ...positionStyleMap[direction || 'none'],
              }}
            >
              {dragTitle}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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

export default HoverBlock;
