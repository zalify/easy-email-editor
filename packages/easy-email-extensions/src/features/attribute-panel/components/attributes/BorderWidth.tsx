import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { TextField } from '@extensions/shared/form';

export function BorderWidth() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <TextField
        label={t('Width')}
        quickchange
        name={`${focusIdx}.attributes.border-width`}
      />
    );
  }, [focusIdx]);
}
