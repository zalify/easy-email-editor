import React, { useMemo } from 'react';
import { AutoComplete as ArcoAutoComplete, AutoCompleteProps as ArcoAutoCompleteProps } from '@arco-design/web-react';
import { isString } from 'lodash';

export interface AutoCompleteProps
  extends Omit<ArcoAutoCompleteProps, 'onChange' | 'options'> {
  quickchange?: boolean;
  value: string;
  options: Array<{ value: any; label: any }>;
  onChange: (val: string) => void;
  showSearch?: boolean;
}

export function AutoComplete(props: AutoCompleteProps) {
  const options = useMemo(() => {
    const selectedValue = (props.value || '').toLowerCase();
    return props.options
      .filter(item => {
        return (
          (isString(item.value) && item.value.toLowerCase().startsWith(selectedValue)) ||
          (isString(item.label) && item.label.toLowerCase().startsWith(selectedValue))
        );
      })
      .map(item => ({ ...item, name: item.label }));
  }, [props.options, props.value]);

  return (
    <ArcoAutoComplete
      {...props}
      data={options}
    />
  );
}
