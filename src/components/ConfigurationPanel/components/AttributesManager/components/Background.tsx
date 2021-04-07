import React, { useMemo } from 'react';
import {
  SelectField,
  TextField,
} from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/TextStyle';
import { Color } from './Color';

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
        <Color />
        <Stack vertical spacing='none'>
          <TextField
            label='Background image'
            inline
            name={`${focusIdx}.attribute.background-url`}
          />
          <TextField
            label='Background size'
            inline
            name={`${focusIdx}.attribute.background-size`}
          />
        </Stack>
        <SelectField
          label='Background repeat'
          name={`${focusIdx}.attribute.background-repeat`}
          options={backgroundRepeatOptions}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
