import React, { useMemo } from 'react';
import { CoreTranslationsMap } from '@core/typings';
import { enCoreTranslations } from '@core/translations';

export type CoreTranslationProps = {
  translations: CoreTranslationsMap;
}

export const CoreTranslationsContext = React.createContext<CoreTranslationProps>({
  translations: enCoreTranslations,
});

export const CoreTranslationsProvider: React.FC<CoreTranslationProps & {children: React.ReactNode} > =
  ({ translations, children }) => {

  const value: CoreTranslationProps = useMemo(() => {
    return {
      translations
    }
  }, [translations]);

  return (
    <CoreTranslationsContext.Provider value={value}>
      {children}
    </CoreTranslationsContext.Provider>
  );
};