import React, { useMemo } from 'react';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { RadioGroupField } from '@/components/core/Form';

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
  const { focusIdx } = useBlock();

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
