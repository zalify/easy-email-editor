import { Select as ArcoSelect, SelectProps as ArcoSelectProps } from '@arco-design/web-react';
import { merge } from 'lodash';
import React from 'react';

export interface SelectProps extends ArcoSelectProps {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (val: string) => void;
  value: string;
}

export function Select(props: SelectProps) {
  return (
    <ArcoSelect
      {...props}
      dropdownMenuClassName='easy-email-overlay'
      style={merge({ width: '100%', }, props.style)}
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map((item, index) => (
        <ArcoSelect.Option key={index} value={item.value}>
          {item.label}
        </ArcoSelect.Option>
      ))}
    </ArcoSelect>
  );
}
