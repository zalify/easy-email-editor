import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Background } from '@/components/ConfigurationPanel/components/Background';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/TextAlign';
import { Border } from '@/components/ConfigurationPanel/components/Border';

export function Panel() {

  return (
    <Stack>
      <Padding />
      <Background />
      <TextAlign />
      <Border />
    </Stack>
  );

}