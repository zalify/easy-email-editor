import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { ContainerBackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { BorderWidth } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BorderWidth';
import { BorderStyle } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BorderStyle';
import { BorderColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BorderColor';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Align } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Align';

import { useFocusIdx } from '@/hooks/useFocusIdx';
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
