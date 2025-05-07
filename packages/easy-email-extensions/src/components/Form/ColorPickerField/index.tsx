import { colorAdapter } from '@extensions/AttributePanel/components/adapter';
import React, { ComponentProps } from 'react';
import { ColorPicker, ColorPickerProps } from '../ColorPicker';
import enhancer from '../enhancer';

const ColorPickerFieldSource = enhancer<ColorPickerProps>(ColorPicker, e => e, {
  debounceTime: 1,
});

export const ColorPickerField = (
  props: ComponentProps<typeof ColorPickerFieldSource>,
) => {
  return (
    <ColorPickerFieldSource
      config={colorAdapter}
      {...props}
    />
  );
};
