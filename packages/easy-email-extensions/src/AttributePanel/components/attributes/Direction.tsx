import React, { useMemo } from 'react';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';

const options = [
  {
    value: 'ltr',
    get label() {
      return t('ltr');
    },
  },
  {
    value: 'rtl',
    get label() {
      return t('rtl');
    },
  },
];

export function Direction() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack>
        <RadioGroupField
          label={t('Direction')}
          name={`${focusIdx}.attributes.direction`}
          options={options}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
