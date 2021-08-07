import { BlockType } from '@/constants';
import { IBlockData } from '@/typings';
import { Direction } from '@/utils/getTangentDirection';
import React, { useState } from 'react';

export interface HoverIdxState {
  hoverIdx: string;
}

export interface DataTransfer {
  type: BlockType;
  payload?: any;
  action: 'add' | 'move';
}

export const HoverIdxContext = React.createContext<{
  hoverIdx: string;
  isDragging: boolean;
  setHoverIdx: React.Dispatch<React.SetStateAction<string>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  direction: Direction | '';
  setDirection: React.Dispatch<React.SetStateAction<Direction | ''>>;
  dataTransfer: DataTransfer | null;
  setDataTransfer: React.Dispatch<React.SetStateAction<DataTransfer | null>>;
}>({
  hoverIdx: '',
  direction: '',
  isDragging: false,
  dataTransfer: null,
  setHoverIdx: () => {},
  setIsDragging: () => {},
  setDirection: () => {},
  setDataTransfer: () => {},
});

export const HoverIdxProvider: React.FC<{}> = (props) => {
  const [hoverIdx, setHoverIdx] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dataTransfer, setDataTransfer] = useState<DataTransfer | null>(null);
  const [direction, setDirection] = useState<Direction | ''>('');

  return (
    <HoverIdxContext.Provider
      value={{
        dataTransfer,
        setDataTransfer,
        hoverIdx,
        setHoverIdx,
        isDragging,
        setIsDragging,
        direction,
        setDirection,
      }}
    >
      {props.children}
    </HoverIdxContext.Provider>
  );
};
