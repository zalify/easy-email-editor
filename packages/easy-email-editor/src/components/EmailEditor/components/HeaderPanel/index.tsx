import { Stack } from '@/components/UI/Stack';
import React from 'react';
import { useFormState } from 'react-final-form';

export function HeaderPanel() {
  const { values } = useFormState();
  return (
    <Stack>
      <div>
        {values.subject}
      </div>
      <Stack.Item />
    </Stack>
  );
}
