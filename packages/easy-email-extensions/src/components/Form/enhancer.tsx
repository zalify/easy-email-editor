import { TextStyle, Stack, StackProps } from 'easy-email-editor';
import { Form } from '@arco-design/web-react';
import { FieldProps, useField, useForm } from 'react-final-form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { InputProps } from './Input';
import { debounce } from 'lodash';

export interface EnhancerProps<T> extends Partial<FieldProps<T, any>> {
  name: string;
  label: React.ReactNode | null;
  labelHidden?: boolean;
  alignment?: StackProps['alignment'];
  distribution?: StackProps['distribution'];
  helpText?: React.ReactNode;
  inline?: boolean;
  required?: boolean;
  valueAdapter?: (value: any) => any;
  onChangeAdapter?: (value: any) => any;
  validate?: (value: any) => string | undefined | Promise<string | undefined>;
  wrapper?: boolean;
  size?: InputProps['size'];
}

let primaryId = 0;
export default function enhancer<P, C extends (...rest: any[]) => any = any>(
  Component: any,
  changeAdapter: C
) {
  return (
    props: EnhancerProps<P> & Omit<P, 'value' | 'onChange' | 'mutators'>
  ) => {
    const {
      name,
      onChangeAdapter,
      valueAdapter,
      inline,
      label,
      labelHidden,
      helpText,
      alignment,
      distribution,
      validate,
      required,
      size,
      wrapper = true,
      debounceTime = 0,
      ...rest
    } = props;

    const {
      input: { value, onBlur },
      meta: { touched, error },
    } = useField(name, {
      validate,
    });

    const [currentValue, setCurrentValue] = useState(value);

    const id = useMemo(() => {
      return `enhancer-${primaryId++}`;
    }, []);

    const { change, mutators } = useForm();

    const debounceCallbackChange = useCallback(
      debounce(
        (val) => {
          change(name, val);
        },
        60,
        {
          maxWait: 60,
        }
      ),
      [change, name]
    );

    useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    const onFieldChange = useCallback(
      (e: any) => {
        const newVal = onChangeAdapter
          ? onChangeAdapter(changeAdapter(e))
          : changeAdapter(e);
        setCurrentValue(newVal);
        debounceCallbackChange(newVal);
        onBlur();
      },
      [onBlur, onChangeAdapter, debounceCallbackChange]
    );

    if (!wrapper)
      return (
        <Component
          {...rest}
          mutators={mutators}
          id={id}
          name={name}
          checked={valueAdapter ? valueAdapter(currentValue) : currentValue}
          value={valueAdapter ? valueAdapter(currentValue) : currentValue}
          onChange={onFieldChange}
        />
      );

    return (
      <Form.Item
        noStyle
        validateStatus={touched && error ? 'error' : undefined}
        help={touched && error}
      >
        <Stack vertical spacing='extraTight'>
          <Stack
            spacing={inline ? undefined : 'extraTight'}
            wrap={false}
            vertical={!inline}
            alignment={alignment ? alignment : inline ? 'center' : undefined}
            distribution={distribution}
          >
            <Stack.Item>
              <label
                className={labelHidden ? styles['label-hidden'] : undefined}
                htmlFor={id}
              >
                <span style={{ whiteSpace: 'pre' }}>
                  {required && <span style={{ color: '#ff4d4f' }}>* </span>}
                  <TextStyle size={size === 'small' ? 'smallest' : 'small'}>
                    {label}
                  </TextStyle>
                </span>
              </label>
            </Stack.Item>
            <Stack.Item fill={inline}>
              <Component
                size={size}
                {...rest}
                mutators={mutators}
                id={id}
                name={name}
                checked={
                  valueAdapter ? valueAdapter(currentValue) : currentValue
                }
                value={valueAdapter ? valueAdapter(currentValue) : currentValue}
                onChange={onFieldChange}
              />
            </Stack.Item>
          </Stack>
          <div className={styles.helperText}>
            <small>{helpText}</small>
          </div>
        </Stack>
      </Form.Item>
    );
  };
}
