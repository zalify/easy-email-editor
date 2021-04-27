import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import { TextAlign } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { ColorPickerField, TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Width } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Height } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { Link } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Link';
import * as Yup from 'yup';

const isValidPicture = async (v: string) => {
  try {
    await Yup.string().url().validate(v);
    return undefined;
  } catch (error) {
    return 'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally';
  }
};

export function Panel() {
  const { focusIdx } = useBlock();

  return (
    <Stack vertical>
      <ColorPickerField
        label='color'
        name={`${focusIdx}.attributes.color`}
        inline
        alignment='center'
      />
      <TextField
        label='src'
        name={`${focusIdx}.attributes.src`}
        helpText="The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally."
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
