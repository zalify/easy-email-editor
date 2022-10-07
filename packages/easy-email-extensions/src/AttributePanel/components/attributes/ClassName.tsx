import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { TextField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function ClassName() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <TextField label={t('attributes.className')} name={`${focusIdx}.attributes.css-class`} />
    );
  }, [focusIdx, t]);
}
