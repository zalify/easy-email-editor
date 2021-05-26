import React, { useMemo } from 'react';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';
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
  attributeName?: string;
}) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack>
        <SelectField
          style={{ width: 120 }}
          label='Vertical align'
          name={`${focusIdx}.attributes.${attributeName}`}
          options={options}
          inline
        />
      </Stack>
    );
  }, [attributeName, focusIdx]);
}
