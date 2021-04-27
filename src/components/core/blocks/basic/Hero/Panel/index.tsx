import React from 'react';
import { Stack } from '@/components/Stack';
import { BackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { RadioGroupField, TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Height } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { VerticalAlign } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/VerticalAlign';

const options = [
  {
    value: 'fluid-height',
    label: 'Fluid height',
  },
  {
    value: 'fixed-height',
    label: 'Fixed height',
  },
];
export function Panel() {
  const { focusIdx } = useBlock();
  return (
    <Stack vertical>
      <TextField
        label='Background height'
        name={`${focusIdx}.attributes.background-height`}
        inline
      />
      <TextField
        label='Background position'
        name={`${focusIdx}.attributes.background-position`}
        inline
      />
      <TextField
        label='Background url'
        name={`${focusIdx}.attributes.background-url`}
        inline
        helpText="The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally."
      />
      <TextField
        label='Background width'
        name={`${focusIdx}.attributes.background-width`}
        inline
      />
      <TextField
        label='Border radius'
        name={`${focusIdx}.attributes.border-radius`}
        inline
        quickchange
      />
      <Width />
      <RadioGroupField
        label='Mode'
        name={`${focusIdx}.attributes.mode`}
        options={options}
        inline
      />
      <Height />
      <VerticalAlign />
      <BackgroundColor />
    </Stack>
  );
}
