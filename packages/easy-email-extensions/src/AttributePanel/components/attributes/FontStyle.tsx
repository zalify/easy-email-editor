import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

const options = [
  {
    value: 'normal',
    label: 'Normal',
  },
  {
    value: 'italic',
    label: 'Italic',
  },
];

export function FontStyle({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return (
    <RadioGroupField
      label={t('attributes.fontStyle')}
      name={name || `${focusIdx}.attributes.font-style`}
      options={options}
    />
  );
}
