import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';

export const borderStyleOptions = [
  {
    value: 'dashed',
    get label() {
      return t('Dashed');
    },
  },
  {
    value: 'dotted',
    get label() {
      return t('Dotted');
    },
  },
  {
    value: 'solid',
    get label() {
      return t('Solid');
    },
  },
  {
    value: 'double',
    get label() {
      return t('double');
    },
  },
  {
    value: 'ridge',
    get label() {
      return t('ridge');
    },
  },
  {
    value: 'groove',
    get label() {
      return t('groove');
    },
  },
  {
    value: 'inset',
    get label() {
      return t('inset');
    },
  },
  {
    value: 'outset',
    get label() {
      return t('outset');
    },
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
