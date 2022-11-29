import { InputProps as ArcoInputProps } from '@arco-design/web-react';
export interface InputProps extends Omit<ArcoInputProps, 'onChange'> {
    quickchange?: boolean;
    value: string;
    onChange: (val: string) => void;
}
export declare function Input(props: InputProps): JSX.Element;
