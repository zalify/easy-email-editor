import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { BorderWidth } from '@/components/ConfigurationPanel/components/AttributesManager/components/BorderWidth';
import { BorderStyle } from '@/components/ConfigurationPanel/components/AttributesManager/components/BorderStyle';
import { BorderColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/BorderColor';

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
