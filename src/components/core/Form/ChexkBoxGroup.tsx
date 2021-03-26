import { Checkbox } from 'antd';
import { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { merge } from 'lodash';
import React from 'react';
import { Stack } from '../../Stack';

export interface CheckboxGroupProps extends AntdCheckboxGroupProps {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (e: CheckboxValueType[]) => void;
  value?: CheckboxValueType[];
  style?: Partial<React.CSSProperties>;
  checkboxStyle?: Partial<React.CSSProperties>;
  vertical?: boolean;
}

export function ChexkBoxGroup(props: CheckboxGroupProps) {
  const { vertical = false, ...rest } = props;
  return (
    <Checkbox.Group style={merge({ width: '100%' }, rest.style)} value={rest.value} onChange={rest.onChange}>
      <Stack vertical={vertical} spacing="extraTight">
        {
          rest.options.map((item, index) =>
            <Checkbox style={rest.checkboxStyle} key={index} value={item.value}>{item.label}</Checkbox>)
        }
      </Stack>
    </Checkbox.Group>
  );
}