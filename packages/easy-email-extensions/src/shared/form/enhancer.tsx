import { Field, UseFieldConfig } from 'react-final-form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRefState } from 'easy-email-editor';
import { debounce } from 'lodash';
import { Form, FormItemProps } from '@arco-design/web-react';

export interface EnhancerProps {
  name: string;
  onChangeAdapter?: (value: any) => any;
  validate?: (value: any) => string | undefined | Promise<string | undefined>;
  config?: UseFieldConfig<any, any>;
  changeOnBlur?: boolean;
  formItem?: FormItemProps;
  label?: FormItemProps['label'];
  inline?: boolean;
  equalSpacing?: boolean;
  required?: boolean;
  autoComplete?: 'on' | 'off';
  style?: React.CSSProperties;
  helpText?: React.ReactNode;
  debounceTime?: number;
  labelHidden?: boolean;
}

const parse = (v: any) => v;
export default function enhancer<P extends { onChange?: (...rest: any) => any }>(
  Component: React.FC<any>,
  changeAdapter: (args: Parameters<NonNullable<P['onChange']>>) => any,
  option?: { debounceTime: number },
) {
  return (props: EnhancerProps & Omit<P, 'value' | 'onChange' | 'mutators'>) => {
    const {
      name,
      validate,
      onChangeAdapter,
      changeOnBlur,
      inline,
      equalSpacing,
      formItem,
      label,
      required,
      style,
      helpText,
      autoComplete,
      labelHidden,
      ...rest
    } = props;

    const debounceTime = props.debounceTime || option?.debounceTime || 300;

    const config = useMemo(() => {
      return {
        ...props.config,
        validate: validate,
        parse: props.config?.parse || parse,
      };
    }, [props.config, validate]);

    const [currentValue, setCurrentValue] = useState('');
    const currentValueRef = useRefState(currentValue);

    const layoutStyle = useMemo((): FormItemProps => {
      if (equalSpacing) {
        return {
          labelCol: {
            span: 11,
            style: {
              textAlign: 'left',
              paddingRight: 0,
            },
          },
          wrapperCol: {
            span: 11,
            offset: 1,
            style: {
              textAlign: 'right',
            },
          },
        };
      }
      if (inline) {
        return {
          labelCol: {
            span: 7,
            style: {
              textAlign: 'right',
              paddingRight: 0,
            },
          },
          wrapperCol: {
            span: 16,
            offset: 1,
            style: {},
          },
        };
      }

      return {
        labelCol: {
          span: 24,
          style: {
            paddingRight: 0,
          },
        },
        wrapperCol: {
          span: 24,
        },
      };
    }, [equalSpacing, inline]);

    return useMemo(() => {
      return (
        <Field
          name={name}
          {...config}
        >
          {({ input: { onBlur, onChange, value }, meta }) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps

            const debounceCallbackChange = useCallback(
              debounce(
                val => {
                  onChange(val);
                  onBlur();
                },
                debounceTime,
                {
                  // maxWait: 500,
                },
              ),
              [onChange, onBlur],
            );

            const onFieldChange: P['onChange'] = useCallback(
              (e: any) => {
                const newVal = onChangeAdapter
                  ? onChangeAdapter(changeAdapter(e))
                  : changeAdapter(e);

                setCurrentValue(newVal);
                if (!changeOnBlur) {
                  debounceCallbackChange(newVal);
                }
              },
              [debounceCallbackChange],
            );

            const onFieldBlur = useCallback(() => {
              if (changeOnBlur) {
                onChange(currentValueRef.current);
                onBlur();
              }
            }, [onBlur, onChange]);

            useEffect(() => {
              setCurrentValue(value);
            }, [value]);

            return (
              <Form.Item
                style={{
                  ...style,
                  margin: '0px',
                }}
                rules={required ? [{ required: true }] : undefined}
                {...layoutStyle}
                {...formItem}
                label={labelHidden ? undefined : label || formItem?.label}
                labelAlign='left'
                validateStatus={meta.touched && meta.error ? 'error' : undefined}
                help={meta.touched && meta.error ? meta.error : helpText}
              >
                <Component
                  autoComplete={autoComplete}
                  {...rest}
                  name={name}
                  checked={currentValue}
                  value={currentValue}
                  onChange={onFieldChange}
                  onBlur={onFieldBlur}
                />
              </Form.Item>
            );
          }}
        </Field>
      );
    }, [
      autoComplete,
      changeOnBlur,
      config,
      currentValue,
      currentValueRef,
      debounceTime,
      formItem,
      helpText,
      label,
      labelHidden,
      layoutStyle,
      name,
      onChangeAdapter,
      required,
      rest,
      style,
    ]);
  };
}
