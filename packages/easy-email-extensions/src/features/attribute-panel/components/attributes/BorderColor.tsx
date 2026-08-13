import React, { useMemo } from 'react';
import { ColorPickerField } from '@extensions/shared/form';
import { useFocusIdx } from 'easy-email-editor';

export function BorderColor() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label={t('Color')}
        name={`${focusIdx}.attributes.border-color`}
      />
    );
  }, [focusIdx]);
}
