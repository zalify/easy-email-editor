import { Select as AntdSelect, } from 'antd';
import { SelectProps as AntdSelectProps } from 'antd/lib/select';
import { merge } from 'lodash';
import React from 'react';

export interface SelectProps extends AntdSelectProps<string> {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (val: string) => void;
  value: string;
}

export function Select(props: SelectProps) {
  return (
    <AntdSelect {...props} style={merge({ width: '100%', minWidth: 100 }, props.style)} value={props.value} onChange={props.onChange}>
      {
        props.options.map((item, index) => <AntdSelect.Option key={index} value={item.value}>{item.label}</AntdSelect.Option>)
      }
    </AntdSelect>
  );
}