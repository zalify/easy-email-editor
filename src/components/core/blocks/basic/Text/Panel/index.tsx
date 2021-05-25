import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { TextDecoration } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { FontWeight } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontStyle } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { TextTransform } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/TextTransform';
import { FontFamily } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { Height } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { ContainerBackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { FontSize } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { Color } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Align } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { LineHeight } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { LetterSpacing } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/LetterSpacing';
import { RichTextField } from '@/components/core/Form';

import { useFocusIdx } from '@/hooks/useFocusIdx';
export function Panel() {
  const { focusIdx } = useFocusIdx();

  return (
    <Stack vertical>
      <RichTextField
        idx={focusIdx}
        name={`${focusIdx}.data.value.content`}
        label=''
        lableHidden
      />
      <Color />
      <ContainerBackgroundColor />
      <FontSize />
      <LineHeight />
      <Align />
      <Stack.Item />
      <Stack.Item />

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
