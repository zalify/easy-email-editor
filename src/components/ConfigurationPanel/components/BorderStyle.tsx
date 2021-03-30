import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { SelectField } from '@/components/core/Form';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';

const options = getOptionsByStringArray(['dashed', 'dotted', 'solid']);

export function BorderStyle() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <SelectField
        label="Border style"
        name={`${focusIdx}.attribute.border-style`}
        options={options}
        inline
      />

    );
  }, [focusIdx]);
}
