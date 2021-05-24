import React, { useMemo } from 'react';
import { ColorPickerField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function BackgroundColor() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label='Background color'
        name={`${focusIdx}.attributes.background-color`}
        inline
        alignment='center'
      />
    );
  }, [focusIdx]);
}
