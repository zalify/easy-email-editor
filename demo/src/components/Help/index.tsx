import React from 'react';
import { IconQuestionCircle } from '@arco-design/web-react/icon';
import { Tooltip, TooltipProps } from '@arco-design/web-react';

export function Help(
  props: TooltipProps & Partial<{ style: Partial<React.CSSProperties> }>
) {
  return (
    <Tooltip {...{ ...props, style: undefined }}>
      <IconQuestionCircle style={props.style} />
    </Tooltip>
  );
}
