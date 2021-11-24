import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { TextField } from '../../../components/Form';

export function FontSize() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <TextField
        label='Font size'
        name={`${focusIdx}.attributes.font-size`}
        quickchange
      />
    );
  }, [focusIdx]);
}
