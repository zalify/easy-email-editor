import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { TextField } from '@/components/core/Form';

export function FontSize() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <TextField
        label='Font size'
        quickchange
        name={`${focusIdx}.attributes.font-size`}
        inline
      />
    );
  }, [focusIdx]);
}
