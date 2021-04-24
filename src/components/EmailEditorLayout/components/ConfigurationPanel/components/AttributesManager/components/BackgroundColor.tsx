import React, { useMemo } from 'react';
import { ColorPickerField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';

export function BackgroundColor() {
  const { focusIdx } = useBlock();

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
