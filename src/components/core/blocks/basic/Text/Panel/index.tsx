import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/TextAlign';
import { ColorPickerField, TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/ConfigurationPanel/components/Width';

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
        label="font-size"
        quickchange
        name={`${focusIdx}.attribute.font-size`}
        inline
      />
      <TextField
        label="line-height"
        name={`${focusIdx}.attribute.line-height`}
        inline
      />
      <TextField
        label="font-family"
        name={`${focusIdx}.attribute.font-family`}
        inline
      />
      <TextField
        label="font-style"
        name={`${focusIdx}.attribute.font-style`}
        inline
      />
      <TextField
        label="font-weight"
        name={`${focusIdx}.attribute.font-weight`}
        inline
      />

      <TextField
        label="letter-spacing"
        name={`${focusIdx}.attribute.letter-spacing`}
        inline
      />
      <TextField
        label="height"
        name={`${focusIdx}.attribute.height`}
        inline
      />
      <TextField
        label="text-decoration"
        name={`${focusIdx}.attribute.text-decoration`}
        inline
      />
      <TextField
        label="text-transform"
        name={`${focusIdx}.attribute.text-transform`}
        inline
      />
      <TextAlign />
      <ColorPickerField
        label='container-background-color'
        name={`${focusIdx}.attribute.container-background-color`}
        inline
        alignment='center'
      />
      <Width />
      <Padding />
      <TextAlign />
    </Stack>
  );

}
