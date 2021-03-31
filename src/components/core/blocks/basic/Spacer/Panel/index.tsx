import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/TextAlign';
import { ColorPickerField, TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/ConfigurationPanel/components/Width';
import { Height } from '@/components/ConfigurationPanel/components/Height';
import { Link } from '@/components/ConfigurationPanel/components/Link';

export function Panel() {
  const { focusIdx } = useBlock();

  return (
    <Stack>
      <ColorPickerField
        label='color'
        name={`${focusIdx}.attribute.color`}
        inline
        alignment='center'
      />
      <TextField
        label="src"
        quickchange
        name={`${focusIdx}.attribute.src`}
        inline
      />
      <Width />
      <Height />

      <Link />
      <TextField
        label="border"
        name={`${focusIdx}.attribute.border`}
        inline
      />
      <TextAlign />
      <ColorPickerField
        label='container-background-color'
        name={`${focusIdx}.attribute.container-background-color`}
        inline
        alignment='center'
      />
      <Padding />
      <TextField
        label="title"
        name={`${focusIdx}.attribute.title`}
        inline
      />
      <TextField
        label="alt"
        name={`${focusIdx}.attribute.alt`}
        inline
      />
    </Stack>
  );

}
