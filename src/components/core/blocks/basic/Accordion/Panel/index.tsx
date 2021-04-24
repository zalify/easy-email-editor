import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { BackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import {
  RadioGroupField,
  SelectField,
  TextField,
} from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { FontFamily } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';

const positionOptions = [
  {
    value: 'left',
    label: 'Left',
  },
  {
    value: 'right',
    label: 'Right',
  },
];

const alignOptions = [
  {
    value: 'top',
    label: 'top',
  },
  {
    value: 'middle',
    label: 'middle',
  },
  {
    value: 'bottom',
    label: 'bottom',
  },
];

export function Panel() {
  const { focusIdx } = useBlock();
  return (
    <Stack vertical>
      <Padding />
      <BackgroundColor />
      <FontFamily />
      <TextField
        label='border'
        name={`${focusIdx}.attributes.border`}
        inline
        quickchange
      />
      <TextField
        label='Icon width'
        quickchange
        name={`${focusIdx}.attributes.icon-width`}
        inline
      />
      <TextField
        label='Icon height'
        quickchange
        name={`${focusIdx}.attributes.icon-height`}
        inline
      />
      <TextField
        label='Icon unwrapped url'
        quickchange
        name={`${focusIdx}.attributes.icon-unwrapped-url`}
        inline
      />
      <TextField
        label='Icon wrapped url'
        quickchange
        name={`${focusIdx}.attributes.icon-wrapped-url`}
        inline
      />
      <RadioGroupField
        label='Icon position'
        name={`${focusIdx}.attributes.icon-position`}
        options={positionOptions}
        inline
      />
      <SelectField
        style={{ width: 120 }}
        label='Icon align'
        name={`${focusIdx}.attributes.icon-align`}
        options={alignOptions}
        inline
      />
    </Stack>
  );
}
