import React, { useCallback, useState } from 'react';
import { BlockType, FIXED_CONTAINER_ID } from '@/constants';
import { useDataTransfer } from '@/hooks/useDataTransfer';
import { createPortal } from 'react-dom';
import { debounce } from 'lodash';

export type BlockAvatarWrapperProps = {
  type: BlockType | string;
  payload?: any;
  action?: 'add' | 'move';
};

export const BlockAvatarWrapper: React.FC<BlockAvatarWrapperProps> = (
  props
) => {
  const { type, children, payload, action = 'add' } = props;
  const [isDragging, setIsDragging] = useState(false);
  const { setDataTransfer } = useDataTransfer();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onDragStart = useCallback(
    (ev: React.DragEvent) => {
      setIsDragging(true);
      setDataTransfer({
        type: type as BlockType,
        action,
        payload,
      });
      const img = new Image();

      ev.dataTransfer.setDragImage(img, 0, 0);
    },
    [action, payload, setDataTransfer, type]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDrag = useCallback(debounce((event: React.DragEvent) => {
    setPosition({
      x: event.pageX,
      y: event.pageY
    });
  }), []);

  const onDragEnd = useCallback(() => {
    setDataTransfer(null);
    setIsDragging(false);

  }, [setDataTransfer]);

  return (
    <div onMouseDown={() => {
      window.getSelection()?.removeAllRanges();
    }}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd} draggable
      style={{ cursor: 'grab' }}
    >
      {children}
      {
        isDragging && createPortal((
          <div style={{ position: 'fixed', left: position.x - 50, top: position.y - 50, zIndex: 999, pointerEvents: 'none' }}>
            {children}
          </div>), document.getElementById(FIXED_CONTAINER_ID)!)
      }
    </div>
  );
};
