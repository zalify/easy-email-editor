import React from 'react';
import { InputWithUnitField } from '@extensions/shared/form';
import { useFocusIdx } from 'easy-email-editor';

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
