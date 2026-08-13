import { Radio, RadioGroupProps as ArcoRadioGroupProps } from '@arco-design/web-react';
import { merge } from 'lodash';
import React from 'react';
import { Stack } from 'easy-email-editor';

export interface RadioGroupProps extends ArcoRadioGroupProps {
  options: Array<{ value: string; label: React.ReactNode }>;
  onChange?: (value: string) => void;
  value?: string;
  type?: 'radio' | 'button';
  vertical?: boolean;
}

export function RadioGroup(props: RadioGroupProps) {
  const { type, vertical, ...rest } = props;
  return (
    <Radio.Group
      {...rest}
      style={merge({ width: '100%' }, rest.style)}
      value={rest.value}
      onChange={rest.onChange}
    >
      <Stack vertical={vertical} spacing='extraTight'>
        {rest.options.map((item, index) => (
          <Radio key={index} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </Stack>
    </Radio.Group>
  );
}
