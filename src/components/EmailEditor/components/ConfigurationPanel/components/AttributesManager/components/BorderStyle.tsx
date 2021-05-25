import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/useFocusIdx';
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
  const { focusIdx } = useFocusIdx();

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
