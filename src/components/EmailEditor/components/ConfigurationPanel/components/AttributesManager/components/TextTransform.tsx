import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { SelectField } from '@/components/core/Form';

const options = [
  {
    value: '',
    label: 'none',
  },
  {
    value: 'uppercase',
    label: 'uppercase',
  },
  {
    value: 'lowercase',
    label: 'lowercase',
  },
  {
    value: 'capitalize',
    label: 'capitalize',
  },
];

export function TextTransform() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label='Text transform'
        name={`${focusIdx}.attributes.text-transform`}
        options={options}
      />
    );
  }, [focusIdx]);
}
