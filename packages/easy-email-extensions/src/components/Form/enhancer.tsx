import { TextStyle, Stack, StackProps } from 'easy-email-editor';
import { Form } from '@arco-design/web-react';
import { FieldProps, useField, useForm } from 'react-final-form';
import React, { useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import styles from './index.module.scss';
import { InputProps } from './Input';

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
    const id = useMemo(() => {
      return `enhancer-${primaryId++}`;
    }, []);
    const { change, mutators } = useForm();
    const {
      input: { value, onBlur },
      meta: { touched, error },
    } = useField(name, {
      validate,
    });

    const onFieldChange = useCallback(
      debounce((e: any) => {
        const newVal = onChangeAdapter
          ? onChangeAdapter(changeAdapter(e))
          : changeAdapter(e);
        change(name, newVal);
        onBlur();
      }),
      [change, name, onBlur, onChangeAdapter]
    );

    if (!wrapper)
      return (
        <Component
          {...rest}
          mutators={mutators}
          id={id}
          name={name}
          checked={valueAdapter ? valueAdapter(value) : value}
          value={valueAdapter ? valueAdapter(value) : value}
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
                checked={valueAdapter ? valueAdapter(value) : value}
                value={valueAdapter ? valueAdapter(value) : value}
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
