import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { Width } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Direction } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Direction';
import { BackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { VerticalAlign } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/VerticalAlign';

import { useFocusIdx } from '@/hooks/useFocusIdx';
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
