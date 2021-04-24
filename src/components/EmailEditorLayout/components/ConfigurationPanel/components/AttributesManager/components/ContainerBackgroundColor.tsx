import React, { useMemo } from 'react';
import { ColorPickerField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';

export function ContainerBackgroundColor() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <ColorPickerField
        label='Container background color'
        name={`${focusIdx}.attributes.container-background-color`}
        inline
        alignment='center'
      />
    );
  }, [focusIdx]);
}
