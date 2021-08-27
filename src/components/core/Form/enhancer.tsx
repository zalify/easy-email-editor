import { TextStyle } from '@/components/UI/TextStyle';
import { Form } from 'antd';
import { FieldProps, useField, useForm } from 'react-final-form';
import React, { useCallback, useMemo } from 'react';
import { Stack, StackProps } from '../../UI/Stack';
import styles from './index.module.scss';

export interface EnhancerProps<T> extends Partial<FieldProps<T, any>> {
  name: string;
  label: React.ReactNode;
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
}

let primaryId = 0;
export default function enhancer<P>(
  Component: any,
  changeAdapter: (e: any) => any
) {
  return (props: EnhancerProps<P> & Omit<P, 'value' | 'onChange'>) => {
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
      wrapper = true,
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
      (e: any) => {
        const newVal = onChangeAdapter
          ? onChangeAdapter(changeAdapter(e))
          : changeAdapter(e);
        change(name, newVal);
        onBlur();
      },
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
        style={{ margin: 0 }}
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
                  <TextStyle size='small'>{label}</TextStyle>
                </span>
              </label>
            </Stack.Item>
            <Stack.Item fill={inline}>
              <Component
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
