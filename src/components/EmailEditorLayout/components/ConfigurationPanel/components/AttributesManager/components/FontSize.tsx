import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { TextField } from '@/components/core/Form';

export function FontSize() {
  const { focusIdx } = useBlock();

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
