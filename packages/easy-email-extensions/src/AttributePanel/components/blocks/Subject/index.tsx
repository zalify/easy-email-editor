import { TextField } from '@extensions';
import React from 'react';

export function Subject() {
  return (
    <TextField
      label={t('Subject')}
      name={'subject'}
      inline
    />
  )
}
