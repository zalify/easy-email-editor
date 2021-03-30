import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Background } from '@/components/ConfigurationPanel/components/Background';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/TextAlign';
import { Border } from '@/components/ConfigurationPanel/components/Border';
import { VerticalAlign } from '@/components/ConfigurationPanel/components/verticalAlign';
import { BackgroundColor } from '@/components/ConfigurationPanel/components/BackgroundColor';
import { Color } from '@/components/ConfigurationPanel/components/Color';
import { Link } from '@/components/ConfigurationPanel/components/Link';
// import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/ContainerBackgroundColor';

export function Panel() {
  return (
    <Stack>
      <Color />
      <BackgroundColor />
      <Border />
      {/* <ContainerBackgroundColor /> */}
      <Padding />
      <VerticalAlign attributeName='align' />
      <TextAlign />
      <Link />
    </Stack>
  );
}
