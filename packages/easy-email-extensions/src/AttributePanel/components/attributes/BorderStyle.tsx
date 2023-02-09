import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';

export const borderStyleOptions = [
  {
    value: 'dashed',
    label: t('Dashed'),
  },
  {
    value: 'dotted',
    label: t('Dotted'),
  },
  {
    value: 'solid',
    label: t('Solid'),
  },
  {
    value: 'double',
    label: t('double'),
  },
  {
    value: 'ridge',
    label: t('ridge'),
  },
  {
    value: 'groove',
    label: t('groove'),
  },
  {
    value: 'inset',
    label: t('inset'),
  },
  {
    value: 'outset',
    label: t('outset'),
  },
];

export function BorderStyle() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label={t('Style')}
        name={`${focusIdx}.attributes.border-style`}
        options={borderStyleOptions}
      />
    );
  }, [focusIdx]);
}
