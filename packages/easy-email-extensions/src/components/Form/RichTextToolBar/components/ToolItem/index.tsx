import { Tooltip } from '@arco-design/web-react';
import { classnames } from '@extensions/utils/classnames';
import React from 'react';

export const ToolItem: React.FC<{
  title?: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<any>;
  trigger?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
}> = (props) => {
  if (!props.title) {
    return (
      <button
        tabIndex={-1}
        className='easy-email-extensions-emailToolItem'
        title={props.title}
        onClick={props.onClick}
        style={props.style}
      >
        {props.icon}
      </button>
    );
  }
  return (
    <Tooltip mini position='bottom' content={props.title}>
      <button
        tabIndex={-1}
        className={classnames('easy-email-extensions-emailToolItem', props.isActive && 'easy-email-extensions-emailToolItem-active')}
        title={props.title}
        onClick={props.onClick}
        style={props.style}
      >
        {props.icon}
      </button>
    </Tooltip>
  );
};
