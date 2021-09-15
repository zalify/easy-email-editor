import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Direction } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Direction';
import { BackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { VerticalAlign } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/VerticalAlign';

import { useFocusIdx } from '@/hooks/useFocusIdx';
import { AttributesPanel } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/AttributesPanel';
export function Panel() {
  return (
    <AttributesPanel>
      <Stack vertical>
        <Width />
        <BackgroundColor />
        <VerticalAlign />
        <Direction />
      </Stack>
    </AttributesPanel>
  );
}
