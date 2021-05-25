import React, { useMemo } from 'react';
import { Stack } from '@/components/UI/Stack';
import { RadioGroupField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';

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
