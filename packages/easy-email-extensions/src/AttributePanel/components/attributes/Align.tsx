import React, { useMemo } from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

const options = [
  {
    value: 'left',
    label: 'left',
  },
  {
    value: 'center',
    label: 'center',
  },
  {
    value: 'right',
    label: 'right',
  },
];

export function Align({ inline }: { inline?: boolean }) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return (
    <RadioGroupField
      label={t('attributes.align')}
      name={`${focusIdx}.attributes.align`}
      options={options}
    />
  );
}
