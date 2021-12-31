import { Tooltip } from '@arco-design/web-react';
import React from 'react';

export const ToolItem: React.FC<{
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  trigger?: string;
}> = (props) => {
  return (
    <Tooltip mini position='bottom' content={props.title}>
      <button
        tabIndex={-1}
        className='easy-email-extensions-emailToolItem'
        title={props.title}
        onClick={props.onClick}
      >
        {props.icon}
      </button>
    </Tooltip>
  );
};
