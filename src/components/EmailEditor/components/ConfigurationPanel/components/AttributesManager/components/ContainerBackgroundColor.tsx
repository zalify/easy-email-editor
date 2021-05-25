import React, { useMemo } from 'react';
import { ColorPickerField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function ContainerBackgroundColor() {
  const { focusIdx } = useFocusIdx();

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
