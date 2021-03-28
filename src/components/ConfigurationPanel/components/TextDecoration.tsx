import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { SelectField } from '@/components/core/Form';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';

const textDecorationOptions = getOptionsByStringArray([
  'none',
  'underline',
  'overline',
  'line-through',
  'blink',
  'inherit',
]);

export function TextDecoration() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <SelectField
        label="Text decoration"
        name={`${focusIdx}.attribute.textDecoration`}
        options={textDecorationOptions}
        inline
      />
    );
  }, [focusIdx]);
}
