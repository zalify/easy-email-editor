import { Button } from 'antd';
import React from 'react';

export const ToolItem: React.FC<{
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  trigger?: string;
}> = (props) => {
  return (
    // <Tooltip placement="top" title={props.title} trigger={props.trigger}>
    <Button
      title={props.title}
      size='small'
      icon={props.icon}
      onClick={props.onClick}
    />
    // </Tooltip>
  );
};
