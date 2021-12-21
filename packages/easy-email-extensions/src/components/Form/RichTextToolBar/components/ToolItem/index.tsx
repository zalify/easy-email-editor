import { Tooltip } from '@arco-design/web-react';
import React from 'react';

export const ToolItem: React.FC<{
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  trigger?: string;
}> = (props) => {
  return (
    <Tooltip mini content={props.title}>
      <button
        className='easy-email-extensions-emailToolItem'
        title={props.title}
        onClick={props.onClick}
      >
        {props.icon}
      </button>
    </Tooltip>
  );
};
