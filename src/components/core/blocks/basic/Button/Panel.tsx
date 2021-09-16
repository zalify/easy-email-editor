import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { TextAlign } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { Border } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { BackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { Color } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Link } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Link';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { ContainerBackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { Align } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { FontSize } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontStyle } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { FontWeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontFamily } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { TextDecoration } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { TextTransform } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextTransform';
import { LineHeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { LetterSpacing } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LetterSpacing';
import { InlineTextField } from '@/components/core/Form';

import { useFocusIdx } from '@/hooks/useFocusIdx';
export function Panel() {
  const { focusIdx } = useFocusIdx();

  return (
    <Stack vertical>
      <div style={{ position: 'absolute' }}>
        <InlineTextField
          idx={focusIdx}
          name={`${focusIdx}.data.value.content`}
          label=''
          labelHidden
        />
      </div>

      <Color />
      <FontSize />
      <Link />
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
      <Padding title='Inner padding' attributeName='inner-padding' />
      <Padding title='Padding' attributeName='padding' />
      <Border />
      <ContainerBackgroundColor />
      <TextAlign />
    </Stack>
  );
}
