import React from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from '@jupitermail/easy-email-editor';

export function LineHeight({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label={t('Line height')}
      unitOptions='percent'
      name={name || `${focusIdx}.attributes.line-height`}
    />
  );
}
