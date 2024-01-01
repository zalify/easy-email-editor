import { useFocusIdx } from 'easy-email-editor';
import React, { useMemo } from 'react';
import { RangeSliderField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export function Height({ min = 100, max = 800 }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <RangeSliderField
        label={t('Height')}
        // type='number'
        suffix='px'
        name={`${focusIdx}.attributes.height`}
        // quickchange
        config={pixelAdapter}
        autoComplete='off'
        min={min}
        max={max}
        showTextField
      />
    );
  }, [focusIdx, max, min]);
}
