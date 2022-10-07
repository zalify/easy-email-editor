import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { TextField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function BorderWidth() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <TextField
        label={t('attributes.width')}
        quickchange
        name={`${focusIdx}.attributes.border-width`}
      />
    );
  }, [focusIdx, t]);
}
