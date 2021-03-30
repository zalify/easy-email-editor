import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { ColorPickerField } from '@/components/core/Form';

export function BorderColor() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <ColorPickerField
        label='Border color'
        name={`${focusIdx}.attribute.border-color`}
        inline
      />
    );
  }, [focusIdx]);
}
