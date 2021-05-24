import React, { useMemo } from 'react';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { RadioGroupField } from '@/components/core/Form';

const options = [
  {
    value: 'ltr',
    label: 'ltr',
  },
  {
    value: 'rtl',
    label: 'rtl',
  },
];

export function Direction() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack>
        <RadioGroupField
          label='Direction'
          name={`${focusIdx}.attributes.direction`}
          options={options}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
