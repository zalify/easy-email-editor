import { classnames } from '@/utils/classnames';
import React from 'react';

export function IconFont(props: {
  iconName: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClickCapture?: React.MouseEventHandler<HTMLDivElement>;
  size?: number;
  style?: React.CSSProperties;
  title?: string;
}) {
  return (
    <div
      title={props.title}
      onClick={props.onClick}
      onClickCapture={props.onClickCapture}
      style={{
        cursor: 'pointer',
        pointerEvents: 'auto',
        color: 'rgba(0, 0, 0, 0.85)',
        ...props.style,
        fontSize: props.size || props.style?.fontSize,
      }}
      className={classnames('iconfont', props.iconName)}
    />
  );
}
