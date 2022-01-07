import {
  Input as ArcoInput,
  InputProps as ArcoInputProps,
  Select,
} from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import styles from './index.module.scss';
import { Input } from './Input';

export interface InputWithUnitProps extends Omit<ArcoInputProps, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
  unitOptions?: Array<{ value: string; label: string }> | 'default' | 'percent';
}

const defaultUnitOptions = [
  {
    value: 'px',
    label: 'px',
  },
];

const percentUnitOptions = [
  {
    value: 'px',
    label: 'px',
  },
  {
    value: '%',
    label: '%',
  },
];

export function InputWithUnit(props: InputWithUnitProps) {
  const {
    value = '',
    onKeyDown: onPropsKeyDown,
    unitOptions: propsUnitOptions,
    ...restProps
  } = props;

  const unitOptions = useMemo(() => {
    if (propsUnitOptions === 'percent') return percentUnitOptions;
    if (Array.isArray(propsUnitOptions)) return propsUnitOptions;
    return defaultUnitOptions;
  }, [propsUnitOptions]);

  const parseValue = useMemo(() => {
    if (Number(value) === parseFloat(value)) {
      return {
        text: value,
        unit: '',
      };
    }

    if (
      isNaN(Number(value)) &&
      isNaN(parseFloat(value)) &&
      unitOptions.some((u) => u.value === value)
    ) {
      return {
        text: '',
        unit: value,
      };
    }

    const arr = value.split(/(\d+(\.\d+)?)(\D+)$/);
    return {
      text: arr[1] || '',
      unit: arr[3] || unitOptions[0].value,
    };
  }, [value, unitOptions]);

  // const onChange = useCallback(
  //   (val: string) => {
  //     props.onChange(val);
  //   },
  //   [props.onChange]
  // );

  // const onChangeText = useCallback(
  //   (val: string) => {
  //     if (/^(\d*?)$/.test(val) || /^\d+\.(\d)?$/.test(val)) {
  //       onChange(val + parseValue.unit);
  //     }
  //   },
  //   [onChange, parseValue]
  // );

  // const onChangeUnit = useCallback(
  //   (val: string) => {
  //     onChange(parseValue.text + val);
  //   },
  //   [onChange, parseValue]
  // );

  // const onKeyDown = useCallback(
  //   (ev: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (onPropsKeyDown) {
  //       onPropsKeyDown?.(ev);
  //     }

  //     let step = 0;
  //     if (ev.key === 'ArrowUp') {
  //       step = 1;
  //     }
  //     if (ev.key === 'ArrowDown') {
  //       step = -1;
  //     }

  //     if (step) {
  //       if (/^\d+/.test(value)) {
  //         ev.preventDefault();
  //         onChange(
  //           String(value).replace(/^(\d+)/, (_, match) => {
  //             return (Number(match) + step).toString();
  //           })
  //         );
  //       }
  //     }
  //   },
  //   [onPropsKeyDown, value, onChange]
  // );
  // Todo
  // return (
  //   <ArcoInput.Group compact style={{ display: 'flex' }}>
  //     <ArcoInput
  //       {...restProps}
  //       value={parseValue.text}
  //       onChange={onChangeText}
  //       onKeyDown={onKeyDown}
  //       autoComplete='off'
  //     />
  //     <Select
  //       style={{ width: '4em' }}
  //       value={parseValue.unit}
  //       className={styles.inputWithUnit}
  //       onChange={onChangeUnit}
  //     >
  //       {unitOptions.map((item, index) => (
  //         <Select.Option
  //           key={index}
  //           className={styles.inputWithUnitSelectOption}
  //           value={item.value}
  //         >
  //           {item.label}
  //         </Select.Option>
  //       ))}
  //     </Select>
  //   </ArcoInput.Group>
  // );

  return <Input value={value} {...restProps} quickchange />;
}
