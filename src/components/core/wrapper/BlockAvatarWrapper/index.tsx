import React, { useCallback } from 'react';
import { BlockType } from '@/constants';

export type BlockAvatarWrapperProps = {
  type: BlockType;
  payload?: any;
  action?: 'add' | 'move';
};

export const BlockAvatarWrapper: React.FC<BlockAvatarWrapperProps> = (
  props
) => {
  const { type, children, payload, action = 'add' } = props;

  const onDragStart = useCallback(
    (ev: React.DragEvent) => {
      ev.dataTransfer.setData('Text', type);
      ev.dataTransfer.setData('Action', action);
      if (payload) {
        ev.dataTransfer.setData('Payload', JSON.stringify(payload));
      }
    },
    [action, payload, type]
  );

  return (
    <div onDragStart={onDragStart} draggable>
      {children}
    </div>
  );
};
