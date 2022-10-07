import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function ContainerBackgroundColor({
  title,
}: {
  title?: string;
}) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();
  const label = title ? title : t('attributes.containerBackgroundColor');

  return useMemo(() => {
    return (
      <ColorPickerField
        label={label}
        name={`${focusIdx}.attributes.container-background-color`}
        alignment='center'
      />
    );
  }, [focusIdx, title, label]);
}
