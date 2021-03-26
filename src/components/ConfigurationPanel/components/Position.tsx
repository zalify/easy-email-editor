import React, { useMemo } from 'react';
import { SelectField, TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/TextStyle';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';

const positionOptions = getOptionsByStringArray([
  'static',
  'absolute',
  'relative',
  'fixed',
]);

export function Position() {
  const { focusIdx } = useBlock();

  return (
    <Stack vertical spacing='extraTight'>
      <TextStyle size={'large'}>定位</TextStyle>
      <SelectField
        label='定位方式'
        name={`${focusIdx}.style.position`}
        options={positionOptions}
        inline
      />
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField label='上' quickchange name={`${focusIdx}.style.top`} inline />
        </Stack.Item>
        <Stack.Item fill>
          <TextField label='下' quickchange name={`${focusIdx}.style.bottom`} inline />
        </Stack.Item>
      </Stack>

      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField label='左' quickchange name={`${focusIdx}.style.left`} inline />
        </Stack.Item>
        <Stack.Item fill>
          <TextField label='右' quickchange name={`${focusIdx}.style.right`} inline />
        </Stack.Item>
      </Stack>
    </Stack>
  );
}
