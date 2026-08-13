import React from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { InputWithUnitField } from '@extensions/shared/form';
import { pixelAdapter } from '@extensions/features/attribute-panel/components/adapter';

export function FontSize() {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label={t('Font size (px)')}
      name={`${focusIdx}.attributes.font-size`}
      config={pixelAdapter}
      autoComplete='off'
    />
  );
}
