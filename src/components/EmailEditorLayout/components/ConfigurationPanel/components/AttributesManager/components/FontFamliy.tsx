import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { TextField } from '@/components/core/Form';

export function FontFamily() {
  const { focusIdx } = useBlock();

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
