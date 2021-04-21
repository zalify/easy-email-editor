import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { Border } from '@/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { Color } from '@/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Width } from '@/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { FontSize } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontStyle } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { FontFamily } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
export function Panel() {
  return (
    <Stack vertical>
      <Color />
      <ContainerBackgroundColor />
      <Padding />
      <Width />
      <FontFamily />
      <FontSize />
      <FontStyle />
      <TextAlign />
      <Border />
    </Stack>
  );
}
