import { InputProps as ArcoInputProps } from '@arco-design/web-react';
export interface InputWithUnitProps extends Omit<ArcoInputProps, 'onChange'> {
    value: string;
    onChange: (val: string) => void;
    unitOptions?: Array<{
        value: string;
        label: string;
    }> | 'default' | 'percent';
}
export declare function InputWithUnit(props: InputWithUnitProps): JSX.Element;
