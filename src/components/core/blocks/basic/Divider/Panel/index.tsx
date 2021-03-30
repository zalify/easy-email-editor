import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Stack } from '@/components/Stack';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/ContainerBackgroundColor';
import { BorderWidth } from '@/components/ConfigurationPanel/components/BorderWidth';
import { BorderStyle } from '@/components/ConfigurationPanel/components/BorderStyle';
import { BorderColor } from '@/components/ConfigurationPanel/components/BorderColor';

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
