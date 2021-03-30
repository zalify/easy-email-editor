import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Background } from '@/components/ConfigurationPanel/components/Background';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/TextAlign';
import { Border } from '@/components/ConfigurationPanel/components/Border';
import { BackgroundColor } from '@/components/ConfigurationPanel/components/BackgroundColor';
import { Color } from '@/components/ConfigurationPanel/components/Color';
import { Link } from '@/components/ConfigurationPanel/components/Link';
import { TextAreaField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/ConfigurationPanel/components/Width';
import { Align } from '@/components/ConfigurationPanel/components/Align';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/ContainerBackgroundColor';

export function Panel() {
  const { focusIdx } = useBlock();
  return (
    <Stack vertical>
      <TextAreaField
        label='Content'
        name={`${focusIdx}.data.value.content`}
        inline
      />
      <Color />
      <ContainerBackgroundColor />
      <BackgroundColor />
      <Width />
      <Align />
      <Padding title="Inner padding" attributeName="inner-padding" />
      <Padding title="Padding" attributeName="padding" />
      <TextAlign />
      <Link />
      <Border />
    </Stack>
  );
}
