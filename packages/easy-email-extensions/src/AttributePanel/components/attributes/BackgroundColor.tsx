import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function BackgroundColor({
  title,
}: {
  title?: string;
}) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();
  const label = title ? title : t('attributes.backgroundColor');

  return useMemo(() => {
    return (
      <ColorPickerField
        label={label}
        name={`${focusIdx}.attributes.background-color`}
        alignment='center'
      />
    );
  }, [focusIdx, label]);
}
