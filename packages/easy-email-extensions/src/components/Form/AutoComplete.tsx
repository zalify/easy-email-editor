import { Autocomplete, AutocompleteProps } from '@shopify/polaris';
import React, { useCallback, useMemo, useState } from 'react';
import {
  AutoComplete as ArcoAutoComplete,
  AutoCompleteProps as ArcoAutoCompleteProps,
} from '@arco-design/web-react';
import { isString } from 'lodash';

export interface AutoCompleteProps
  extends Omit<AutocompleteProps, 'onChange' | 'options'> {
  // quickchange?: boolean;
  value: string;
  options: { value: any; label: any }[];
  onChange: (val: string) => void;
  label?: string;
  // showSearch?: boolean;
}

// export default function AutoComplete(props: AutoCompleteProps) {
//   const options = useMemo(() => {
//     const selectedValue = (props.value || '').toLowerCase();
//     return props.options
//       .filter(item => {
//         return (
//           (isString(item.value) && item.value.toLowerCase().startsWith(selectedValue)) ||
//           (isString(item.label) && item.label.toLowerCase().startsWith(selectedValue))
//         );
//       })
//       .map(item => ({ ...item, name: item.label }));
//   }, [props.options, props.value]);

//   return (
//     <ArcoAutoComplete
//       {...props}
//       data={options}
//     />
//   );
// }

const AutoComplete = (props: AutoCompleteProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([props.value]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(props.options);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(props.options);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = props.options.filter(option =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [props.options],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map(selectedItem => {
        const matchedOption = options.find(option => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });
      setSelectedOptions(selected);
      props.onChange(selected[0]);
      setInputValue(selectedValue[0] || '');
    },
    [options, props],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={props?.label}
      value={inputValue}
      placeholder='Search'
      autoComplete='off'
    />
  );

  return (
    <Autocomplete
      options={options}
      selected={selectedOptions}
      onSelect={updateSelection}
      textField={textField}
    />
  );
};
export default AutoComplete;
