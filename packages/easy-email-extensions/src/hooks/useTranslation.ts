import { useCallback, useContext } from 'react';
import { ExtensionContext } from '@extensions';
import get from 'lodash/get';

export const useTranslation = () => {
  const { translations } = useContext(ExtensionContext);

  const t = useCallback((key: string, options?: Record<string, string>) => {
    if (translations) {
      let str = get(translations, key, '');
      if (options) {
        Object.keys(options).forEach((key) => {
          const regexp = new RegExp(`{{${key}}}`, 'g');
          str = str.replace(regexp, options[key]);
        })
      }
      return str;
    }

    return undefined;
  }, [translations]);

  return { t, translations };
}