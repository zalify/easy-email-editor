import { PopoverProps } from '@arco-design/web-react';
import React from 'react';
export interface ColorPickerProps extends PopoverProps {
    onChange?: (val: string) => void;
    value?: string;
    label: string;
    children?: React.ReactNode;
    showInput?: boolean;
}
export declare function ColorPicker(props: ColorPickerProps): JSX.Element;
