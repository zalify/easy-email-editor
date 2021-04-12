import { Button, Tooltip } from 'antd';
import React from 'react';

export const ToolItem: React.FC<{
  title: React.ReactNode,
  icon: React.ReactNode;
  onClick?: () => void;
  trigger?: string;
}> = (props) => {
  return (
    <Tooltip
      placement='top'
      title={props.title}
      trigger={props.trigger}
    >
      <Button size='small' icon={props.icon} onClick={props.onClick} />
    </Tooltip>
  );
};