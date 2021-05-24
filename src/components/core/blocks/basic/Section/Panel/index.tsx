import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Background } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Background';
import { Stack } from '@/components/UI/Stack';
import { TextAlign } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { Border } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Border';

import { useFocusIdx } from '@/hooks/useFocusIdx';
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