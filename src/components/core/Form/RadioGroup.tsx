
import { Radio } from 'antd';
import { RadioChangeEvent, RadioGroupProps as AntdRadioGroupProps } from 'antd/lib/radio';
import { merge } from 'lodash';
import React from 'react';
import { Stack } from '../../Stack';

export interface RadioGroupProps extends AntdRadioGroupProps {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (e: RadioChangeEvent) => void;
  value?: string;
  type?: 'radio' | 'button';
  vertical?: boolean;
}

export function RadioGroup(props: RadioGroupProps) {
  const { type, vertical, ...rest } = props;
  return (
    <Radio.Group style={merge({ width: '100%' }, rest.style)} value={rest.value} onChange={rest.onChange}>

      <Stack vertical={vertical} spacing="extraTight">
        {
          type === 'button'
            ? rest.options.map((item, index) => <Radio.Button key={index} value={item.value}>{item.label}</Radio.Button>)
            : rest.options.map((item, index) => <Radio key={index} value={item.value}>{item.label}</Radio>)
        }
      </Stack>
    </Radio.Group>
  );
}