import React, { useMemo } from 'react';
import {
  AutoComplete as ArcoAutoComplete,
  AutoCompleteProps as ArcoAutoCompleteProps,
} from '@arco-design/web-react';
import { isString } from 'lodash';

export interface AutoCompleteProps
  extends Omit<ArcoAutoCompleteProps, 'onChange' | 'options'> {
  quickchange?: boolean;
  value: string;
  options: Array<{ value: any; label: any }>;
  onChange: (val: string) => void;
}

export function AutoComplete(props: AutoCompleteProps) {
  const options = useMemo(() => {
    return props.options
      .filter((item) => {
        return (
          (isString(item.value) &&
            item.value.toLowerCase().startsWith(props.value.toLowerCase())) ||
          (isString(item.label) &&
            item.label.toLowerCase().startsWith(props.value.toLowerCase()))
        );
      })
      .map((item) => ({ ...item, name: item.label }));
  }, [props.options, props.value]);

  return <ArcoAutoComplete {...props} data={options} />;
}
