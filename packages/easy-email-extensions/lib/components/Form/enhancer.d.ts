import { StackProps } from 'easy-email-editor';
import { FieldProps } from 'react-final-form';
import React from 'react';
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
export default function enhancer<P, C extends (...rest: any[]) => any = any>(Component: any, changeAdapter: C): (props: EnhancerProps<P> & Omit<P, 'value' | 'onChange' | 'mutators'>) => JSX.Element;
