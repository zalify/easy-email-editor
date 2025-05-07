import { Input as ArcoInput, InputProps as ArcoInputProps } from '@arco-design/web-react';
import React, { useCallback } from 'react';

export interface InputProps extends Omit<ArcoInputProps, 'onChange'> {
  quickchange?: boolean;
  value: string;
  onChange: (val: string) => void;
}

export function Input(props: InputProps) {
  const {
    quickchange,
    value = '',
    onKeyDown: onPropsKeyDown,
    onChange: propsOnChange,
  } = props;

  const onChange = useCallback(
    (val: string) => {
      propsOnChange(val);
    },
    [propsOnChange]
  );

  const onKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (onPropsKeyDown) {
        onPropsKeyDown?.(ev);
      }

      if (quickchange) {
        let step = 0;
        if (ev.key === 'ArrowUp') {
          step = 1;
        }
        if (ev.key === 'ArrowDown') {
          step = -1;
        }

        if (step) {
          if (/^\d+/.test(value)) {
            ev.preventDefault();
            onChange(
              String(value).replace(/^(\d+)/, (_, match) => {
                return (Number(match) + step).toString();
              })
            );
          }
        }
      }
    },
    [onPropsKeyDown, quickchange, value, onChange]
  );

  return (
    <ArcoInput
      {...{ ...props, quickchange: undefined }}
      onChange={(value) => onChange(value)}
      onKeyDown={onKeyDown}
    />
  );
}
