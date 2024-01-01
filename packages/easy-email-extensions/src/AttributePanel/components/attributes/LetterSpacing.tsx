import { useFocusIdx } from 'easy-email-editor';
import React from 'react';
import { RangeSliderField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export function LetterSpacing({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return (
    <RangeSliderField
      label={t('Letter spacing')}
      name={name || `${focusIdx}.attributes.letter-spacing`}
      config={pixelAdapter}
      type='number'
      suffix='px'
      min={0}
      max={5}
      showTextField
    />
  );
}
