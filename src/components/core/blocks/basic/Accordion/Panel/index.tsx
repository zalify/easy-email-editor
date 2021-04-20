import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { Border } from '@/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { BackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { Color } from '@/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Link } from '@/components/ConfigurationPanel/components/AttributesManager/components/Link';
import { RadioGroupField, SelectField, TextAreaField, TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { ContainerBackgroundColor } from '@/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { Align } from '@/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { FontSize } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontStyle } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { FontWeight } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontFamily } from '@/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { TextDecoration } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { TextTransform } from '@/components/ConfigurationPanel/components/AttributesManager/components/TextTransform';
import { LineHeight } from '@/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { LetterSpacing } from '@/components/ConfigurationPanel/components/AttributesManager/components/LetterSpacing';

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
