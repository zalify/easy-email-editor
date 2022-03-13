import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';

const options = [
  {
    value: 'initial',
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

export function TextTransform({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label='Text transform'
        name={name || `${focusIdx}.attributes.text-transform`}
        options={options}
      />
    );
  }, [focusIdx, name]);
}
