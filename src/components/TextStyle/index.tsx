import { classnames } from '@demo/utils/classnames';
import React from 'react';
import styles from './TextStyle.module.scss';

export interface TextStyleProps {
  children?: React.ReactNode;
  variation?: 'strong' | 'subdued';
  size?: 'largest' | 'extraLarge' | 'large' | 'medium' | 'small' | 'smallest';
}

export const TextStyle: React.FC<TextStyleProps> = props => {
  const { variation = '', size = 'small' } = props;
  return (
    <span className={classnames(styles[variation], styles[size] || size)}>
      {props.children}
    </span>
  );
};
