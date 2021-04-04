import React from 'react';
import { Stack } from '@/components/Stack';
import { Height } from '@/components/ConfigurationPanel/components/Height';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/ContainerBackgroundColor';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';

export function Panel() {

  return (
    <Stack>
      <ContainerBackgroundColor />
      <Height />
      <Padding />
    </Stack>
  );

}
