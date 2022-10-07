import { BlockLayerProps } from '@extensions/BlockLayer';
import { isEqual, omit } from 'lodash';
import React, { useContext, useMemo, useRef } from 'react';
import { TranslationsMap } from '@extensions/typings';
import { enCoreTranslations, CoreTranslationsMap, components } from '@core';
import { enTranslations } from '@extensions/Translations';
const { CoreTranslationsProvider } = components;

export interface ExtensionProps extends BlockLayerProps {
  categories: Array<
    | {
        label: string;
        active?: boolean;
        blocks: Array<{
          type: string;
          payload?: any;
          title?: string | undefined;
        }>;
        displayType?: 'grid';
      }
    | {
        label: string;
        active?: boolean;
        blocks: Array<{
          payload?: any;
          title?: string | undefined;
        }>;
        displayType: 'column';
      }
    | {
        label: string;
        active?: boolean;
        blocks: Array<{
          payload?: any;
        }>;
        displayType: 'widget';
      }
    | {
        label: string;
        active?: boolean;
        blocks: Array<React.ReactNode>;
        displayType: 'custom';
      }
  >;
  showSourceCode?: boolean;
  compact?: boolean;
  translations?: {
    core: CoreTranslationsMap
  } & TranslationsMap;
}

export const ExtensionContext = React.createContext<ExtensionProps>({
  categories: [],
  translations: {
    core: enCoreTranslations,
    ...enTranslations,
  }
});

export const ExtensionProvider: React.FC<ExtensionProps> = props => {
  const value = omit(props, 'children');
  const valueRef = useRef(value);

  const cacheValue = useMemo(() => {
    if (!isEqual(value, valueRef)) {
      valueRef.current = value;
    }
    return valueRef.current;
  }, [value, valueRef]);

  return (
    <ExtensionContext.Provider value={cacheValue}>
      <CoreTranslationsProvider translations={cacheValue.translations?.core ? cacheValue.translations?.core : enCoreTranslations}>
        {props.children}
      </CoreTranslationsProvider>
    </ExtensionContext.Provider>
  );
};

export function useExtensionProps() {
  return useContext(ExtensionContext);
}
