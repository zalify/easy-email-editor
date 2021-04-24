import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Background } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Background';
import { Stack } from '@/components/Stack';
import { Border } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { Width } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { VerticalAlign } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/VerticalAlign';

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