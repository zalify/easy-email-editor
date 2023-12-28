import React from 'react';
import { Input, InputProps } from './Input';

const InputNumber = (props: InputProps) => {
  return (
    <Input
      {...props}
      type='number'
    />
  );
};

export default InputNumber;
