import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { TextField } from '@/components/core/Form';

export function FontWeight() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <TextField
        label="font-weight"
        name={`${focusIdx}.attribute.font-weight`}
        inline
      />

    );
  }, [focusIdx]);
}
