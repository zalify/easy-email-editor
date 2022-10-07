import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function BorderColor() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <ColorPickerField
        label={t('attributes.color')}
        name={`${focusIdx}.attributes.border-color`}
      />
    );
  }, [focusIdx, t]);
}
