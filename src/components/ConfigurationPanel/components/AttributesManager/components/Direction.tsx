import React, { useMemo } from 'react';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
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
  const { focusIdx } = useBlock();

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
