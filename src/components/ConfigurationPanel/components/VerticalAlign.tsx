import React, { useMemo } from 'react';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { SelectField } from '@/components/core/Form';

const options = [
  {
    value: 'top',
    label: 'top',
  },
  {
    value: 'middle',
    label: 'middle',
  },
  {
    value: 'bottom',
    label: 'bottom',
  },
];

export function VerticalAlign({
  attributeName = 'vertical-align',
}: {
  attributeName: string;
}) {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack>
        <SelectField
          style={{ width: 120 }}
          label='Vertical align'
          name={`${focusIdx}.attribute.${attributeName}`}
          options={options}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
