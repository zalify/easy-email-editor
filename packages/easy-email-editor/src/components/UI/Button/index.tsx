import { classnames } from '@/utils/classnames';
import React from 'react';
import styles from './index.module.scss';

export interface ButtonProps {
  disabled?: boolean;
  title?: string;
  noBorder?: boolean;
  onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'];
}
export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={classnames(
        styles.easyEmailButton,
        props.noBorder && styles.noBorder
      )}
      title={props.title}
      disabled={props.disabled}
      type='button'
    >
      {props.children}
    </button>
  );
};
