import React from 'react';

export const ToolItem: React.FC<{
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  trigger?: string;
}> = (props) => {
  return (
    <button
      className="easy-email-extensions-emailToolItem"
      title={props.title}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
};
