import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { BackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { Color } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { TextAreaField } from '@/components/core/Form';
import { FontSize } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontWeight } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontFamily } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (
    <Stack vertical>
      <TextAreaField
        label='Content'
        name={`${focusIdx}.data.value.content`}
        inline
      />
      <Color />
      <BackgroundColor />
      <FontSize />
      <FontWeight />
      <FontFamily />
      <Padding title="Padding" attributeName="padding" />
    </Stack>
  );
}
