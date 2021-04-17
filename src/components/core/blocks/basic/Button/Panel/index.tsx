import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { Border } from '@/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { BackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { Color } from '@/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Link } from '@/components/ConfigurationPanel/components/AttributesManager/components/Link';
import { TextAreaField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { Align } from '@/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { FontSize } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontStyle } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { FontWeight } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontFamily } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { TextDecoration } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { TextTransform } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextTransform';
import { LineHeight } from '@/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { LetterSpacing } from '@/components/ConfigurationPanel/components/AttributesManager/components/LetterSpacing';

export function Panel() {
  const { focusIdx } = useBlock();
  return (
    <Stack vertical>
      <TextAreaField
        label='Content'
        name={`${focusIdx}.data.value.content`}
        inline
      />
      <Color />
      <FontSize />
      <LineHeight />

      <FontStyle />
      <FontWeight />
      <LetterSpacing />
      <FontFamily />
      <TextDecoration />
      <TextTransform />
      <BackgroundColor />
      <Width />
      <Align />
      <Padding title="Inner padding" attributeName="inner-padding" />
      <Padding title="Padding" attributeName="padding" />
      <Link />
      <Border />
      <ContainerBackgroundColor />
      <TextAlign />
    </Stack>
  );
}
