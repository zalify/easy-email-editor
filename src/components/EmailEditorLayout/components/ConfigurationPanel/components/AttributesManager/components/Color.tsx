import React, { useMemo } from 'react';
import { ColorPickerField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';

export function Color() {
  const { focusIdx } = useBlock();

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
