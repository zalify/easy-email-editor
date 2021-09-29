import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';

const defaultPresetColor: string[] = [
  '#000000',
  '#FFFFFF',
  '#9b9b9b',
  '#d0021b',
  '#4a90e2',
  '#7ed321',
  '#bd10e0',
  '#f8e71c',
];

const CURRENT_COLORS_KEY = 'CURRENT_COLORS_KEY';

export const PresetColorsContext = React.createContext<{
  colors: string[];
  addCurrentColor: (color: string) => void;
}>({
  colors: [],
  addCurrentColor: () => { },
});

export const PresetColorsProvider: React.FC<{}> = (props) => {
  const [currentColors, setCurrentColors] = useLocalStorage<string[]>(
    CURRENT_COLORS_KEY,
    defaultPresetColor
  );

  const colorDivRef = useRef(document.createElement('div'));

  const addCurrentColor = useCallback(
    (newColor: string) => {
      colorDivRef.current.style.color = '';
      colorDivRef.current.style.color = newColor;
      if (colorDivRef.current.style.color) {
        const newColors = [...new Set([...currentColors!, newColor])]
          .filter(Boolean)
          .slice(0, 16);
        setCurrentColors(newColors);
      }
    },
    [currentColors, setCurrentColors]
  );

  return (
    <PresetColorsContext.Provider
      value={{
        colors: currentColors!,
        addCurrentColor,
      }}
    >
      {props.children}
    </PresetColorsContext.Provider>
  );
};
