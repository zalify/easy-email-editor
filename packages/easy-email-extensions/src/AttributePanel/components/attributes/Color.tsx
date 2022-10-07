import React from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Color({
  title,
}: {
  title?: string;
  inline?: boolean;
}) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();
  const label = title ? title : t('attributes.color');

  return (
    <ColorPickerField
      label={label}
      name={`${focusIdx}.attributes.color`}
      alignment='center'
    />
  );
}
