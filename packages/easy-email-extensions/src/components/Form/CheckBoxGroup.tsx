import { merge } from 'lodash';
import React from 'react';
import { Stack } from 'easy-email-editor';
import { Checkbox, CheckboxGroupProps as ArcoCheckboxGroupProps } from '@arco-design/web-react';

export interface CheckboxGroupProps extends ArcoCheckboxGroupProps<any> {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (e: any[]) => void;
  value?: ArcoCheckboxGroupProps<any>['value'];
  style?: Partial<React.CSSProperties>;
  checkboxStyle?: Partial<React.CSSProperties>;
  vertical?: boolean;
}

export function CheckBoxGroup(props: CheckboxGroupProps) {
  const { vertical = false, ...rest } = props;
  return (
    <Checkbox.Group
      style={merge({ width: '100%' }, rest.style)}
      value={rest.value}
      onChange={rest.onChange}
    >
      <Stack vertical={vertical} spacing='extraTight'>
        {rest.options.map((item, index) => (
          <Checkbox style={rest.checkboxStyle} key={index} value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </Stack>
    </Checkbox.Group>
  );
}
