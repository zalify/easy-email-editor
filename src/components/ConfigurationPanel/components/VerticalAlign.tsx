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

export function VerticalAlign() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack>
        <SelectField
          style={{ width: 120 }}
          label='Vertical align'
          name={`${focusIdx}.attribute.vertical-align`}
          options={options}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
