import React, { useCallback } from 'react';
import { BlockType } from '@/constants';
import { useDataTransfer } from '@/hooks/useDataTransfer';

export type BlockAvatarWrapperProps = {
  type: BlockType | string;
  payload?: any;
  action?: 'add' | 'move';
};

export const BlockAvatarWrapper: React.FC<BlockAvatarWrapperProps> = (
  props
) => {
  const { type, children, payload, action = 'add' } = props;
  const { setDataTransfer } = useDataTransfer();

  const onDragStart = useCallback(
    (ev: React.DragEvent) => {

      setDataTransfer({
        type: type as BlockType,
        action,
        payload,
      });
    },
    [action, payload, setDataTransfer, type]
  );

  const onDragEnd = useCallback(() => {
    setDataTransfer(null);
  }, [setDataTransfer]);

  return (
    <div onMouseDown={() => {
      window.getSelection()?.removeAllRanges();
    }} onDragStart={onDragStart}
      onDragEnd={onDragEnd} draggable
      style={{ cursor: 'grab' }}
    >
      {children}
    </div>
  );
};
