import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { RadioGroupField } from '@/components/core/Form';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';

const options = getOptionsByStringArray(['normal', 'italic']);

export function FontStyle() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <RadioGroupField
        label="倾斜"
        name={`${focusIdx}.style.fontStyle`}
        options={options}
        inline
      />

    );
  }, [focusIdx]);
}
