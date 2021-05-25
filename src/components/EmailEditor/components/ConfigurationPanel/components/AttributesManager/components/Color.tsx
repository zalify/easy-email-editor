import React, { useMemo } from 'react';
import { ColorPickerField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function Color() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label='Color'
        name={`${focusIdx}.attributes.color`}
        inline
        alignment='center'
      />
    );
  }, [focusIdx]);
}
