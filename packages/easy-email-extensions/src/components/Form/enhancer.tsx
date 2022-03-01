import { TextStyle, Stack, StackProps } from 'easy-email-editor';
import { Form, Grid, Space } from '@arco-design/web-react';
import { Field, FieldProps, useField } from 'react-final-form';
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
const parse = (v: any) => v;
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
      input: { value, onChange },
    } = useField(name, {
      validate,
      parse: (v) => v,
    });

    const [currentValue, setCurrentValue] = useState(value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceCallbackChange = useCallback(
      debounce(
        (val) => {
          onChange(val);
        },
        500,
        {
          // maxWait: 500,
        }
      ),
      [onChange]
    );

    useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    const id = useMemo(() => {
      return `enhancer-${primaryId++}`;
    }, []);

    return (
      <Field name={name} validate={validate} parse={parse}>
        {({ input: { onBlur }, meta: { touched, error } }) => {
          const onFieldChange = useCallback(
            (e: any) => {
              const newVal = onChangeAdapter
                ? onChangeAdapter(changeAdapter(e))
                : changeAdapter(e);
              setCurrentValue(newVal);
              debounceCallbackChange(newVal);
              onBlur();
            },
            [onBlur]
          );

          if (!wrapper)
            return (
              <Component
                {...rest}
                id={id}
                name={name}
                checked={
                  valueAdapter ? valueAdapter(currentValue) : currentValue
                }
                value={valueAdapter ? valueAdapter(currentValue) : currentValue}
                onChange={onFieldChange}
              />
            );

          const wrapperStyle: {
            label: {
              span: number;
              offset: number;
            };
            value: {
              span: number;
              offset: number;
            };
            textAlign: 'right' | 'left';
          } = inline
              ? {
                label: {
                  span: 7,
                  offset: 0,
                },
                value: {
                  span: 16,
                  offset: 1,
                },
                textAlign: 'right',
              }
              : {
                label: {
                  span: 24,
                  offset: 0,
                },
                value: {
                  span: 24,
                  offset: 0,
                },
                textAlign: 'left',
              };

          return (
            <Form.Item
              noStyle
              validateStatus={touched && error ? 'error' : undefined}
              help={touched && error}
            >
              <Space direction='vertical' style={{ width: '100%' }}>
                <Grid.Row align='center'>
                  <Grid.Col
                    span={wrapperStyle.label.span}
                    offset={wrapperStyle.label.offset}
                    style={{ textAlign: wrapperStyle.textAlign }}
                  >
                    <label
                      className={
                        labelHidden ? styles['label-hidden'] : undefined
                      }
                      style={{ width: '100%', display: 'flex' }}
                      htmlFor={id}
                    >
                      {required && (
                        <span style={{ color: '#ff4d4f', marginRight: 4 }}>
                          *{' '}
                        </span>
                      )}
                      <div style={{ flex: 1 }}> {label}</div>
                    </label>
                  </Grid.Col>
                  <Grid.Col
                    style={{
                      textAlign: 'left',
                    }}
                    offset={wrapperStyle.value.offset}
                    span={wrapperStyle.value.span}
                  >
                    <Component
                      size={size}
                      {...rest}
                      id={id}
                      name={name}
                      checked={
                        valueAdapter ? valueAdapter(currentValue) : currentValue
                      }
                      value={
                        valueAdapter ? valueAdapter(currentValue) : currentValue
                      }
                      onChange={onFieldChange}
                    />
                  </Grid.Col>
                </Grid.Row>
                {helpText && (
                  <div className={styles.helperText}>
                    <small>{helpText}</small>
                  </div>
                )}
              </Space>
            </Form.Item>
          );
        }}
      </Field>
    );
  };
}
