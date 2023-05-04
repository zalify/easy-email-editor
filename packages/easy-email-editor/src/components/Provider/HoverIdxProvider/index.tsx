import React, { useState } from 'react';

export interface HoverIdxState {
  hoverIdx: string;
}

export interface DragPosition {
  left: number;
  top: number;
}
export interface DataTransfer {
  type: string;
  payload?: any;
  action: 'add' | 'move';
  positionIndex?: number;
  parentIdx?: string;
  sourceIdx?: string;
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

export const HoverIdxProvider: React.FC<{ children?: React.ReactNode }> = props => {
  const [hoverIdx, setHoverIdx] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dataTransfer, setDataTransfer] = useState<DataTransfer | null>(null);
  const [direction, setDirection] = useState<string>('');

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
