import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import {
  TextAreaField,
  TextField,
} from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { TextDecoration } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { FontWeight } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontStyle } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { TextTransform } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextTransform';
import { FontFamily } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { Height } from '@/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { FontSize } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { Color } from '@/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Align } from '@/components/ConfigurationPanel/components/AttributesManager/components/Align';

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
