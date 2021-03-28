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

export function TextAlign(props: { attributeName?: string; } = { attributeName: 'text-align' }) {
  const { attributeName = 'text-align' } = props;
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack>
        <RadioGroupField
          label='textAlign'
          name={`${focusIdx}.attribute.${attributeName}`}
          options={textAlignOptions}
          inline
        />
      </Stack>
    );
  }, [attributeName, focusIdx]);
}
