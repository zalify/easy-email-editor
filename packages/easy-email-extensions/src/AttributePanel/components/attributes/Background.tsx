import React, { useContext, useMemo } from 'react';
import {
  ImageUploaderField,
  SelectField,
  TextField,
} from '../../../components/Form';
import { Stack, useFocusIdx, useEditorProps } from 'easy-email-editor';
import { BackgroundColor } from './BackgroundColor';

const backgroundRepeatOptions = [
  {
    value: 'no-repeat',
    label: 'No repeat',
  },
  {
    value: 'repeat',
    label: 'Repeat',
  },
  {
    value: 'repeat-x',
    label: 'Repeat X',
  },
  {
    value: 'repeat-y',
    label: 'Repeat Y',
  },
];

export function Background() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <ImageUploaderField
          label='Background image'
          name={`${focusIdx}.attributes.background-url`}
          helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
          uploadHandler={onUploadImage}
        />
        <BackgroundColor />
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='Background size'
              name={`${focusIdx}.attributes.background-size`}
            />
          </Stack.Item>
          <SelectField
            label='Background repeat'
            name={`${focusIdx}.attributes.background-repeat`}
            options={backgroundRepeatOptions}
          />
        </Stack>
      </Stack>
    );
  }, [focusIdx, onUploadImage]);
}
