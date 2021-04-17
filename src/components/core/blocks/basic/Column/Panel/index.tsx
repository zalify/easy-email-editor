import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Background } from '@/components/ConfigurationPanel/components/AttributesManager/components/Background';
import { Stack } from '@/components/Stack';
import { Border } from '@/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { Width } from '@/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { VerticalAlign } from '@/components/ConfigurationPanel/components/AttributesManager/components/VerticalAlign';

export function Panel() {

  return (
    <Stack>
      <Width />
      <Padding />
      <Background />
      <VerticalAlign />
      <Border />
    </Stack>
  );

}