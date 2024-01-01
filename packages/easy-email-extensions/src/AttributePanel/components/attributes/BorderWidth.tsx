import { useFocusIdx } from 'easy-email-editor';
import React, { useMemo } from 'react';
import { RangeSliderField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export function BorderWidth() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <RangeSliderField
        autoComplete='off'
        // type='number'
        suffix='px'
        config={pixelAdapter}
        label={t('Width')}
        // quickchange
        name={`${focusIdx}.attributes.border-width`}
      />
    );
  }, [focusIdx]);
}
