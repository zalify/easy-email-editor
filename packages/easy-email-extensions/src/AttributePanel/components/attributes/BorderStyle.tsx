import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

export const borderStyleOptions = [
  {
    value: 'dashed',
    label: 'Dashed',
  },
  {
    value: 'dotted',
    label: 'Dotted',
  },
  {
    value: 'solid',
    label: 'Solid',
  },
  {
    value: 'double',
    label: 'double',
  },
  {
    value: 'ridge',
    label: 'ridge',
  },
  {
    value: 'groove',
    label: 'groove',
  },
  {
    value: 'inset',
    label: 'inset',
  },
  {
    value: 'outset',
    label: 'outset',
  },
];

export function BorderStyle() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <SelectField
        label={t('attributes.style')}
        name={`${focusIdx}.attributes.border-style`}
        options={borderStyleOptions}
      />
    );
  }, [focusIdx, t]);
}
