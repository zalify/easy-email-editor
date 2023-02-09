import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';

const options = [
  {
    value: 'initial',
    label: t('none'),
  },
  {
    value: 'uppercase',
    label: t('uppercase'),
  },
  {
    value: 'lowercase',
    label: t('lowercase'),
  },
  {
    value: 'capitalize',
    label: t('capitalize'),
  },
];

export function TextTransform({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label={t('Text transform')}
        name={name || `${focusIdx}.attributes.text-transform`}
        options={options}
      />
    );
  }, [focusIdx, name]);
}
