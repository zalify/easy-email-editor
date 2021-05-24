import React, { useMemo } from 'react';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { RadioGroupField } from '@/components/core/Form';

const options = [
  {
    value: 'left',
    label: 'Left',
  },
  {
    value: 'center',
    label: 'Center',
  },
  {
    value: 'right',
    label: 'Right',
  },
];

export function TextAlign() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack>
        <RadioGroupField
          label='Text align'
          name={`${focusIdx}.attributes.text-align`}
          options={options}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
