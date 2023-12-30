import React from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';
import { percentAdapter } from '../adapter/percent.adapter';

export function LineHeight({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label={t('Line height')}
      name={name || `${focusIdx}.attributes.line-height`}
      config={percentAdapter}
      autoComplete='off'
      suffix='%'
      type='number'
    />
  );
}
