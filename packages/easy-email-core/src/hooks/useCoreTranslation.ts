import { useCallback, useContext } from 'react';
import { CoreTranslationsContext } from '@core/components/CoreTranslationsProvider';
import get from 'lodash/get';

export const useCoreTranslation = () => {
  const { translations } = useContext(CoreTranslationsContext);

  const t = useCallback((key: string) => {
    if (translations) {
      return get(translations.translations, key, '');
    }

    return undefined;
  }, [translations]);

  return { t, translations }
}