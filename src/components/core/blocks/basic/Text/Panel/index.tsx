import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/TextAlign';
import {
  ColorPickerField,
  TextAreaField,
  TextField,
} from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/ConfigurationPanel/components/Width';
import { TextDecoration } from '@/components/ConfigurationPanel/components/TextDecoration';
import { FontWeight } from '@/components/ConfigurationPanel/components/FontWeight';
import { FontStyle } from '@/components/ConfigurationPanel/components/FontStyle';
import { TextTransform } from '@/components/ConfigurationPanel/components/TextTransform';
import { TextTitle } from '@/components/ConfigurationPanel/components/TextTitle';
import { FontFamily } from '@/components/ConfigurationPanel/components/FontFamliy';
import { Height } from '@/components/ConfigurationPanel/components/Height';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/ContainerBackgroundColor';
import { Align } from '@/components/ConfigurationPanel/components/Align';
import { FontSize } from '@/components/ConfigurationPanel/components/FontSize';
import { Color } from '@/components/ConfigurationPanel/components/Color';

export function Panel() {
  const { focusIdx } = useBlock();

  return (
    <Stack>
      <TextAreaField
        label='Content'
        name={`${focusIdx}.data.value.content`}
        inline
      />
      <Color />
      <FontSize />
      <TextField
        label='line-height'
        quickchange
        name={`${focusIdx}.attribute.line-height`}
        inline
      />
      <TextTitle />

      <FontStyle />
      <FontWeight />
      <TextField
        label='letter-spacing'
        name={`${focusIdx}.attribute.letter-spacing`}
        inline
      />
      <Height />
      <FontFamily />
      <TextDecoration />
      <TextTransform />
      <Align />
      <ContainerBackgroundColor />
      <Width />
      <Padding />
    </Stack>
  );
}
