import React from 'react';
import { CheckboxGroupProps as ArcoCheckboxGroupProps } from '@arco-design/web-react';
export interface CheckboxGroupProps extends ArcoCheckboxGroupProps<any> {
    options: Array<{
        value: string;
        label: React.ReactNode;
    }>;
    onChange?: (e: any[]) => void;
    value?: ArcoCheckboxGroupProps<any>['value'];
    style?: Partial<React.CSSProperties>;
    checkboxStyle?: Partial<React.CSSProperties>;
    vertical?: boolean;
}
export declare function CheckBoxGroup(props: CheckboxGroupProps): JSX.Element;
