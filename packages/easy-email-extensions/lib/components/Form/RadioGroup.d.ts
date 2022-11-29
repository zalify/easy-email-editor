import { RadioGroupProps as ArcoRadioGroupProps } from '@arco-design/web-react';
import React from 'react';
export interface RadioGroupProps extends ArcoRadioGroupProps {
    options: Array<{
        value: string;
        label: React.ReactNode;
    }>;
    onChange?: (value: string) => void;
    value?: string;
    type?: 'radio' | 'button';
    vertical?: boolean;
}
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
