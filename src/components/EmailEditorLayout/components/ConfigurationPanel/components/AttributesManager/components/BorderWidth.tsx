import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { TextField } from '@/components/core/Form';

export function BorderWidth() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <TextField
        label='Border width'
        quickchange
        name={`${focusIdx}.attributes.border-width`}
        inline
      />
    );
  }, [focusIdx]);
}
