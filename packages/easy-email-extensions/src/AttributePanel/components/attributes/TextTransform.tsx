import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function TextTransform({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  const options = useMemo(() => {
    return [
      {
        value: 'initial',
        label:  t('attributes.none'),
      },
      {
        value: 'uppercase',
        label:  t('attributes.uppercase'),
      },
      {
        value: 'lowercase',
        label: t('attributes.lowercase'),
      },
      {
        value: 'capitalize',
        label: t('attributes.capitalize'),
      },
    ];
  }, [t])

  return useMemo(() => {
    return (
      <SelectField
        label={t('textTransform')}
        name={name || `${focusIdx}.attributes.text-transform`}
        options={options}
      />
    );
  }, [focusIdx, name, t, options]);
}
