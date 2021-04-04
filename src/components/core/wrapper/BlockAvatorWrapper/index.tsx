import React, {
  useCallback,
} from 'react';
import { IBlockData, RecursivePartial } from '@/typings';
import { BlockType } from '@/constants';

export type BlockAvatorWrapperProps = { type: BlockType; payload?: RecursivePartial<IBlockData>; };

export const BlockAvatorWrapper: React.FC<BlockAvatorWrapperProps> = (props) => {

  const { type, children, payload } = props;

  const onDragStart = useCallback((ev: React.DragEvent) => {
    ev.dataTransfer.setData('Text', type);
    if (payload) {
      ev.dataTransfer.setData('Payload', JSON.stringify(payload));
    }

  }, [payload, type]);

  return (
    <div onDragStart={onDragStart} draggable>
      {children}
    </div>
  );
};
