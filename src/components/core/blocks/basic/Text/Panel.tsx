import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { TextDecoration } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { FontWeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontStyle } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { TextTransform } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextTransform';
import { FontFamily } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { Height } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { ContainerBackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { FontSize } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { Color } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Align } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { LineHeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { LetterSpacing } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LetterSpacing';
import { RichTextField } from '@/components/core/Form';

import { useFocusIdx } from '@/hooks/useFocusIdx';
export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (
    <Stack vertical>
      <div style={{ position: 'absolute' }}>
        <RichTextField
          idx={focusIdx}
          name={`${focusIdx}.data.value.content`}
          label=''
          labelHidden
        />
      </div>

      <Color />
      <ContainerBackgroundColor />
      <FontSize />
      <LineHeight />
      <Align />

      <FontStyle />
      <FontWeight />
      <LetterSpacing />
      <Height />
      <FontFamily />
      <TextDecoration />
      <TextTransform />
      <Padding />
    </Stack>
  );
}
