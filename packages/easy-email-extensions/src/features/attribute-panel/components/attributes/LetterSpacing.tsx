import React from 'react';
import { InputWithUnitField } from '@extensions/shared/form';
import { useFocusIdx } from 'easy-email-editor';

export function LetterSpacing({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label={t('Letter spacing')}
      name={name || `${focusIdx}.attributes.letter-spacing`}
    />
  );
}
