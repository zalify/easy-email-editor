import { TextField } from '@extensions';
import React from 'react';

export function SubTitle() {
  return (
    <TextField
      label={t('SubTitle')}
      name={'subTitle'}
      inline
    />
  )
}