import { Button } from '@arco-design/web-react';
import React from 'react';

export const ToolItem: React.FC<{
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  trigger?: string;
}> = (props) => {
  return (
    <Button
      title={props.title}
      size='mini'
      icon={props.icon}
      onClick={props.onClick}
    />
  );
};
