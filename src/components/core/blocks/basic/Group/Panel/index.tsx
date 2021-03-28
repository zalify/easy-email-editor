import React from 'react';
import { Stack } from '@/components/Stack';
import { Width } from '@/components/ConfigurationPanel/components/Width';
import { useBlock } from '@/hooks/useBlock';
import { ColorPickerField } from '@/components/core/Form';
import { VerticalAlign } from '@/components/ConfigurationPanel/components/verticalAlign';
import { Direction } from '@/components/ConfigurationPanel/components/Direction';

export function Panel() {
  const { focusIdx } = useBlock();
  return (
    <Stack vertical>
      <Width />
      <ColorPickerField
        label='颜色'
        name={`${focusIdx}.attribute.background-color`}
        inline
        alignment='center'
      />
      <VerticalAlign />
      <Direction />
    </Stack>
  );

}
