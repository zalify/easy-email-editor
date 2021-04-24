import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { SelectField } from '@/components/core/Form';

const options = [
  {
    value: 'dashed',
    label: 'Dashed',
  },
  {
    value: 'dotted',
    label: 'Dotted',
  },
  {
    value: 'solid',
    label: 'Solid',
  },
];

export function BorderStyle() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <SelectField
        label='Border style'
        name={`${focusIdx}.attributes.border-style`}
        options={options}
        inline
      />
    );
  }, [focusIdx]);
}
