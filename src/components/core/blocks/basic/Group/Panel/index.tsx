import React from 'react';
import { Stack } from '@/components/Stack';
import { Width } from '@/components/ConfigurationPanel/components/Width';
import { Direction } from '@/components/ConfigurationPanel/components/Direction';
import { BackgroundColor } from '@/components/ConfigurationPanel/components/BackgroundColor';
import { VerticalAlign } from '@/components/ConfigurationPanel/components/VerticalAlign';

export function Panel() {
  return (
    <Stack vertical>
      <Width />
      <BackgroundColor />
      <VerticalAlign />
      <Direction />
    </Stack>
  );

}
