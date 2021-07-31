import { Direction } from '@/utils/getTangentDirection';
import React, { useState } from 'react';

export interface HoverIdxState {
  hoverIdx: string;
}

export const HoverIdxContext = React.createContext<{
  hoverIdx: string;
  isDragging: boolean;
  setHoverIdx: React.Dispatch<React.SetStateAction<string>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  direction: Direction | '';
  setDirection: React.Dispatch<React.SetStateAction<Direction | ''>>;
}>({
  hoverIdx: '',
  direction: '',
  isDragging: false,
  setHoverIdx: () => { },
  setIsDragging: () => { },
  setDirection: () => { },
});

export const HoverIdxProvider: React.FC<{}> = (props) => {
  const [hoverIdx, setHoverIdx] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<Direction | ''>('');

  return (
    <HoverIdxContext.Provider
      value={{
        hoverIdx,
        setHoverIdx,
        isDragging,
        setIsDragging,
        direction,
        setDirection
      }}
    >
      {props.children}
    </HoverIdxContext.Provider>
  );
};
