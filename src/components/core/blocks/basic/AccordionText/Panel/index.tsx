import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { BackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { Color } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { TextAreaField } from '@/components/core/Form';
import { FontSize } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontWeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontFamily } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { LineHeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';

import { useFocusIdx } from '@/hooks/useFocusIdx';
import { AttributesPanel } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/AttributesPanel';

export function Panel() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanel>
      <Stack vertical>
        <TextAreaField
          label='Content'
          name={`${focusIdx}.data.value.content`}
          inline
        />
        <Color />
        <FontSize />
        <LineHeight />
        <FontWeight />
        <FontFamily />
        <BackgroundColor />
        <Padding title='Padding' attributeName='padding' />
      </Stack>
    </AttributesPanel>
  );
}
