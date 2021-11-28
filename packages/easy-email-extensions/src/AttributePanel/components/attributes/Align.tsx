import React, { useMemo } from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';

const options = [
  {
    value: 'left',
    label: 'left',
  },
  {
    value: 'center',
    label: 'center',
  },
  {
    value: 'right',
    label: 'right',
  },
];

export function Align() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack>
        <RadioGroupField
          label='Align'
          name={`${focusIdx}.attributes.align`}
          options={options}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
