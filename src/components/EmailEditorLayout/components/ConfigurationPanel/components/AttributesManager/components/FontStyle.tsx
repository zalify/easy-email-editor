import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/useFocusIdx';
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
  const { focusIdx } = useFocusIdx();

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
