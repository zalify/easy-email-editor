import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { TextField } from '@/components/core/Form';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';

const options = getOptionsByStringArray(['normal', 'italic']);

export function FontFamily() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <TextField
        label='Font-family'
        quickchange
        name={`${focusIdx}.attribute.font-family`}
        inline
      />
    );
  }, [focusIdx]);
}
