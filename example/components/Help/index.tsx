import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';

export function Help(props: TooltipProps & Partial<{ style: Partial<React.CSSProperties>; }>) {
  return (
    <Tooltip {...{ ...props, style: undefined }}>
      <QuestionCircleOutlined style={props.style} />
    </Tooltip>
  );
}