import React, { ComponentProps } from 'react';
import enhancer from '../enhancer';
import NewColorPicker from './NewColorPicker';

const ColorPickerFieldSource = enhancer(NewColorPicker, e => e, {
  debounceTime: 1,
});

export const ColorPickerField = (
  props: ComponentProps<typeof ColorPickerFieldSource>,
) => {
  return <ColorPickerFieldSource {...props} />;
};
