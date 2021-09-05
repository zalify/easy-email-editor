import { BlockType } from '@/constants';
import React, { useState } from 'react';

export interface HoverIdxState {
  hoverIdx: string;
}

export interface DragPosition {
  left: number;
  top: number;
}
export interface DataTransfer {
  type: BlockType;
  payload?: any;
  action: 'add' | 'move';
  positionIndex?: number;
  parentIdx?: string;
}

export const HoverIdxContext = React.createContext<{
  hoverIdx: string;
  isDragging: boolean;
  setHoverIdx: React.Dispatch<React.SetStateAction<string>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  direction: string;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  dataTransfer: DataTransfer | null;
  setDataTransfer: React.Dispatch<React.SetStateAction<DataTransfer | null>>;
  dragPosition: DragPosition;
  setDragPosition: React.Dispatch<React.SetStateAction<DragPosition>>;
}>({
  hoverIdx: '',
  dragPosition: {
    left: 0,
    top: 0
  },
  direction: '',
  isDragging: false,
  dataTransfer: null,
  setHoverIdx: () => { },
  setIsDragging: () => { },
  setDirection: () => { },
  setDataTransfer: () => { },
  setDragPosition: () => { },
});

export const HoverIdxProvider: React.FC<{}> = (props) => {
  const [hoverIdx, setHoverIdx] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dataTransfer, setDataTransfer] = useState<DataTransfer | null>(null);
  const [direction, setDirection] = useState<string>('');
  const [dragPosition, setDragPosition] = useState<DragPosition>({ left: 0, top: 0 });

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
        dragPosition,
        setDragPosition
      }}
    >
      {props.children}
    </HoverIdxContext.Provider>
  );
};
