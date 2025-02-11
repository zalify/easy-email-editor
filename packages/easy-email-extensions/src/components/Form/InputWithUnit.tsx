import { InputProps as ArcoInputProps } from '@arco-design/web-react';
import React from 'react';
import { Input } from './Input';

export interface InputWithUnitProps extends Omit<ArcoInputProps, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
  unitOptions?: Array<{ value: string; label: string }> | 'default' | 'percent';
  quickchange?: boolean;
}

const defaultUnitOptions = [
  {
    value: 'px',
    label: 'px',
  },
];

const percentUnitOptions = [
  {
    value: 'px',
    label: 'px',
  },
  {
    value: '%',
    label: '%',
  },
];

export function InputWithUnit(props: InputWithUnitProps) {
  const {
    value = '',
    onKeyDown: onPropsKeyDown,
    unitOptions: propsUnitOptions,
    ...restProps
  } = props;

  return (
    <Input
      value={value}
      {...restProps}
      quickchange
    />
  );
}
