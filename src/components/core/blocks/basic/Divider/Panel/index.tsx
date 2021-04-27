import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { ContainerBackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { BorderWidth } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BorderWidth';
import { BorderStyle } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BorderStyle';
import { BorderColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BorderColor';
import { Width } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Align } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Align';

export function Panel() {
  return (
    <Stack>
      <Width />
      <Align />
      <BorderWidth />
      <BorderStyle />
      <BorderColor />
      <ContainerBackgroundColor />
      <Padding />
    </Stack>
  );
}
