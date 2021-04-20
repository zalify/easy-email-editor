import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { BackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { Color } from '@/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { TextAreaField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { FontSize } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontWeight } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontFamily } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
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
      <BackgroundColor />
      <FontSize />
      <FontWeight />
      <FontFamily />
      <Padding title="Padding" attributeName="padding" />
    </Stack>
  );
}
