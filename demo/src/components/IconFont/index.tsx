import { classnames } from '@demo/utils/classnames';
import React from 'react';

export function IconFont(props: {
  iconName: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClickCapture?: React.MouseEventHandler<HTMLDivElement>;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={props.onClick}
      onClickCapture={props.onClickCapture}
      style={{
        cursor: 'pointer',
        pointerEvents: 'auto',
        ...props.style,
        fontSize: props.size || props.style?.fontSize,
      }}
      className={classnames('iconfont', props.iconName)}
    />
  );
}
