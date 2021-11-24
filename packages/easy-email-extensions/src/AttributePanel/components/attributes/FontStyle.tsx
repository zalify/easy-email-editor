import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';

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

export function FontStyle({ inline = true }: { inline?: boolean; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <RadioGroupField
        label='Font style'
        name={`${focusIdx}.attributes.font-style`}
        options={options}
        inline={inline}
      />
    );
  }, [focusIdx, inline]);
}
