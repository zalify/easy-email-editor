import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { TextAlign } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { ColorPickerField, TextField } from '@/components/core/Form';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Height } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { Link } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Link';

import { useFocusIdx } from '@/hooks/useFocusIdx';

export function Panel() {
  const { focusIdx } = useFocusIdx();

  return (
    <Stack>
      <ColorPickerField
        label='color'
        name={`${focusIdx}.attributes.color`}
        inline
        alignment='center'
      />
      <TextField
        label='src'
        quickchange
        name={`${focusIdx}.attributes.src`}
        inline
      />
      <Width />
      <Height />

      <Link />
      <TextField label='border' name={`${focusIdx}.attributes.border`} inline />
      <TextAlign />
      <ColorPickerField
        label='container-background-color'
        name={`${focusIdx}.attributes.container-background-color`}
        inline
        alignment='center'
      />
      <Padding />
      <TextField label='title' name={`${focusIdx}.attributes.title`} inline />
      <TextField label='alt' name={`${focusIdx}.attributes.alt`} inline />
    </Stack>
  );
}
