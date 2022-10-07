import React, { useMemo } from 'react';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

const options = [
  {
    value: 'ltr',
    label: 'ltr',
  },
  {
    value: 'rtl',
    label: 'rtl',
  },
];

export function Direction() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <Stack>
        <RadioGroupField
          label={t('attributes.direction')}
          name={`${focusIdx}.attributes.direction`}
          options={options}
          inline
        />
      </Stack>
    );
  }, [focusIdx, t]);
}
