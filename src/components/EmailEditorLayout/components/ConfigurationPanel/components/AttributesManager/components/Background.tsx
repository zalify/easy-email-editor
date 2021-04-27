import React, { useMemo } from 'react';
import { SelectField, TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/TextStyle';
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
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <TextStyle size='large'>Background</TextStyle>
        <BackgroundColor />
        <Stack vertical spacing='none'>
          <TextField
            label='Background image'
            inline
            name={`${focusIdx}.attributes.background-url`}
            helpText="The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally."
          />
          <TextField
            label='Background size'
            inline
            name={`${focusIdx}.attributes.background-size`}
          />
        </Stack>
        <SelectField
          label='Background repeat'
          name={`${focusIdx}.attributes.background-repeat`}
          options={backgroundRepeatOptions}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
