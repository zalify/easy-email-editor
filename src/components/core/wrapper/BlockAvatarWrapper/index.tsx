import React, { useCallback, useState } from 'react';
import { BlockType, FIXED_CONTAINER_ID } from '@/constants';
import { useDataTransfer } from '@/hooks/useDataTransfer';
import { createPortal } from 'react-dom';
import { debounce } from 'lodash';

export type BlockAvatarWrapperProps = {
  type: BlockType | string;
  payload?: any;
  action?: 'add' | 'move';
  hideIcon?: boolean;
};
const img = new Image();
img.src =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=';

export const BlockAvatarWrapper: React.FC<BlockAvatarWrapperProps> = (
  props
) => {
  const { type, children, payload, action = 'add', hideIcon } = props;
  const { setDataTransfer } = useDataTransfer();

  const onDragStart = useCallback(
    (ev: React.DragEvent) => {
      setDataTransfer({
        type: type as BlockType,
        action,
        payload,
      });
      if (hideIcon) {
        ev.dataTransfer.setDragImage(img, 0, 0);
      }
    },
    [action, hideIcon, payload, setDataTransfer, type]
  );

  const onDragEnd = useCallback(() => {
    setDataTransfer(null);
  }, [setDataTransfer]);

  return (
    <div
      onMouseDown={() => {
        window.getSelection()?.removeAllRanges();
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
      style={{ cursor: 'grab' }}
    >
      {children}
    </div>
  );
};
