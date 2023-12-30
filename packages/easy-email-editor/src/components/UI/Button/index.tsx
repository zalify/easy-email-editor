import {
  Button as PolarisButton,
  ButtonProps as PolarisButtonProps,
} from '@shopify/polaris';
import React from 'react';
import './index.scss';

export interface ButtonProps extends Omit<PolarisButtonProps, 'children'> {
  noBorder?: boolean;
  title?: string;
  children?: React.ReactNode | string | JSX.Element;
}
export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <PolarisButton
      onClick={props.onClick}
      title={props.title}
      disabled={props.disabled}
      {...props}
    >
      <>{children}</>
    </PolarisButton>
  );
};
