import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/TextAlign';
import { ColorPickerField, TextAreaField, TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/ConfigurationPanel/components/Width';
import { TextDecoration } from '@/components/ConfigurationPanel/components/TextDecoration';
import { FontWeight } from '@/components/ConfigurationPanel/components/FontWeight';
import { FontStyle } from '@/components/ConfigurationPanel/components/FontStyle';
import { TextTransform } from '@/components/ConfigurationPanel/components/TextTransform';
import { TextTitle } from '@/components/ConfigurationPanel/components/TextTitle';

export function Panel() {
  const { focusIdx } = useBlock();

  return (
    <Stack>
      <TextAreaField
        label='Content'
        name={`${focusIdx}.data.value.content`}
        inline
      />
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
        quickchange
        name={`${focusIdx}.attribute.line-height`}
        inline
      />
      <TextTitle />

      <FontStyle />
      <FontWeight />
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
        label="font-family"
        name={`${focusIdx}.attribute.font-family`}
        inline
      />
      <TextDecoration />
      <TextTransform />
      <TextAlign attributeName="align" />
      <ColorPickerField
        label='container-background-color'
        name={`${focusIdx}.attribute.container-background-color`}
        inline
        alignment='center'
      />
      <Width />
      <Padding />
    </Stack>
  );

}
