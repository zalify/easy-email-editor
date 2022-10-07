import React from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function LineHeight({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return (
    <InputWithUnitField
      label={t('attributes.lineHeight')}
      unitOptions='percent'
      name={name || `${focusIdx}.attributes.line-height`}
    />
  );
}
