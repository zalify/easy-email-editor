import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { ContainerBackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { BorderWidth } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BorderWidth';
import { BorderStyle } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BorderStyle';
import { BorderColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BorderColor';

export function Panel() {
  return (
    <Stack>
      <BorderWidth />
      <BorderStyle />
      <BorderColor />
      <ContainerBackgroundColor />
      <Padding />
    </Stack>
  );
}
