import React from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';

export function Color({
  title = 'Color',
}: {
  title?: string;
  inline?: boolean;
}) {
  const { focusIdx } = useFocusIdx();

  return (
    <ColorPickerField
      label={title}
      name={`${focusIdx}.attributes.color`}
      alignment='center'
    />
  );
}
