import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { TextField } from '@/components/core/Form';

export function FontFamily() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <TextField
        label='Font family'
        quickchange
        name={`${focusIdx}.attributes.font-family`}
        inline
      />
    );
  }, [focusIdx]);
}
