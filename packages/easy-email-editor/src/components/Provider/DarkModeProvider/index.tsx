import React, { useContext, useState, useCallback, useMemo } from 'react';

export {
  DARK_PAGE_BG,
  PREVIEW_BASE_CSS,
  DARK_EMAIL_CSS,
  DARK_EDITOR_CSS_RAW,
  LIGHT_TEXT_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_BG_COLOR,
} from './darkModeCss';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = React.createContext<DarkModeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => { },
});

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider: React.FC<{ children?: React.ReactNode; }> = props => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = useCallback(() => setIsDarkMode(d => !d), []);

  const value = useMemo(
    () => ({ isDarkMode, toggleDarkMode }),
    [isDarkMode, toggleDarkMode],
  );

  return (
    <DarkModeContext.Provider value={value}>{props.children}</DarkModeContext.Provider>
  );
};
