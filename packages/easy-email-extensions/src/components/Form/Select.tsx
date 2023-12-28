import React from 'react';
import {
  Select as PolarisSelect,
  SelectProps as PolarisSelectProps,
} from '@shopify/polaris';

export interface SelectProps
  extends Omit<PolarisSelectProps, 'options' | 'value' | 'onChange'> {
  options: { value: string; label: React.ReactNode }[];
  onChange?: (val: string) => void;
  value: string;
}

// export function Select(props: SelectProps) {
//   return (
//     <ArcoSelect
//       {...props}
//       dropdownMenuClassName='easy-email-overlay'
//       style={merge({ width: '100%' }, props.style)}
//       value={props.value}
//       onChange={props.onChange}
//     >
//       {props.options.map((item, index) => (
//         <ArcoSelect.Option
//           key={index}
//           value={item.value}
//         >
//           {item.label}
//         </ArcoSelect.Option>
//       ))}
//     </ArcoSelect>
//   );
// }

export const Select = (props: SelectProps) => {
  return (
    <PolarisSelect
      {...props}
      value={props.value}
    />
  );
};

export default Select;
