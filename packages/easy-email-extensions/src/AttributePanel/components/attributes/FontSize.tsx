import React from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { InputWithUnitField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function FontSize() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return (
    <InputWithUnitField
      label={t('attributes.fontSize')}
      name={`${focusIdx}.attributes.font-size`}
    />
  );
}
