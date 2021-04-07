import React from 'react';
import { Stack } from '@/components/Stack';
import { Height } from '@/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { Padding } from '@/components/ConfigurationPanel/components/AttributesManager/components/Padding';

export function Panel() {

  return (
    <Stack>
      <ContainerBackgroundColor />
      <Height />
      <Padding />
    </Stack>
  );

}
