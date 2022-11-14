import React from 'react';
import './index.scss';
export interface ButtonProps {
    disabled?: boolean;
    title?: string;
    noBorder?: boolean;
    onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'];
}
export declare const Button: React.FC<ButtonProps>;
