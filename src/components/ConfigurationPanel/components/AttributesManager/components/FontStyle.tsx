import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { RadioGroupField } from '@/components/core/Form';

const options = [
  {
    value: 'normal',
    label: 'Normal',
  },
  {
    value: 'italic',
    label: 'Italic',
  },
];

export function FontStyle() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <RadioGroupField
        label='Font style'
        name={`${focusIdx}.attributes.font-style`}
        options={options}
        inline
      />
    );
  }, [focusIdx]);
}
