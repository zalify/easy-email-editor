import React, { useMemo } from 'react';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { RadioGroupField } from '@/components/core/Form';

const textAlignOptions = [
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

export function TextAlign() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack>
        <RadioGroupField
          label='textAlign'
          name={`${focusIdx}.attribute.textAlign`}
          options={textAlignOptions}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
