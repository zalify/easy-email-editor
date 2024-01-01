import { useFocusIdx } from 'easy-email-editor';
import React from 'react';
import { RangeSliderField } from '../../../components/Form';
import { percentAdapter } from '../adapter/percent.adapter';

export function LineHeight({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return (
    <RangeSliderField
      label='Line height'
      name={name || `${focusIdx}.attributes.line-height`}
      config={percentAdapter}
      autoComplete='off'
      suffix='%'
      max={300}
      showTextField
      // type='number'
    />
  );
}
