import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function TextDecoration({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  const options = useMemo(() => {
    return [
      {
        value: '',
        label:  t('attributes.none'),
      },
      {
        value: 'underline',
        label:  t('attributes.underline'),
      },
      {
        value: 'overline',
        label:  t('attributes.overline'),
      },
      {
        value: 'line-through',
        label:  t('attributes.lineThrough'),
      },
      {
        value: 'blink',
        label:  t('attributes.blink'),
      },
      {
        value: 'inherit',
        label:  t('attributes.inherit'),
      },
    ];
  }, [t]);

  return useMemo(() => {
    return (
      <SelectField
        label={t('attributes.textDecoration')}
        name={name || `${focusIdx}.attributes.text-decoration`}
        options={options}
      />
    );
  }, [focusIdx, name, t, options]);
}
