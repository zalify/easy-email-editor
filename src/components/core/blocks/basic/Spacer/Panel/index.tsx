import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { Height } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { ContainerBackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';

import { useFocusIdx } from '@/hooks/useFocusIdx';
export function Panel() {
  return (
    <Stack>
      <ContainerBackgroundColor />
      <Height />
      <Padding />
    </Stack>
  );
}
