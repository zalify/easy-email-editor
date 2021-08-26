import React, { useMemo } from 'react';
import {
  AutoComplete as AntdAutoComplete,
  AutoCompleteProps as AntdAutoCompleteProps,
} from 'antd';
import { isString } from 'lodash';

export interface AutoCompleteProps
  extends Omit<AntdAutoCompleteProps, 'onChange' | 'options'> {
  quickchange?: boolean;
  value: string;
  options: Array<{ value: any; label: any }>;
  onChange: (val: string) => void;
}

export function AutoComplete(props: AutoCompleteProps) {
  const options = useMemo(() => {
    return props.options.filter((item) => {
      return (
        (isString(item.value) &&
          item.value.toLowerCase().startsWith(props.value.toLowerCase())) ||
        (isString(item.label) &&
          item.label.toLowerCase().startsWith(props.value.toLowerCase()))
      );
    });
  }, [props.options, props.value]);
  return <AntdAutoComplete {...props} options={options} />;
}
