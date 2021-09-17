import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Background } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Background';
import { Stack } from '@/components/UI/Stack';
import { Border } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { VerticalAlign } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/VerticalAlign';
import { AttributesPanel } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/AttributesPanel';

export function Panel() {
  return (
    <AttributesPanel>
      <Stack>
        <Width />
        <Padding />
        <Background />
        <VerticalAlign />
        <Border />
      </Stack>
    </AttributesPanel>
  );
}
