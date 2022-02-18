import { IconFont } from '@/components/IconFont';
import { BlockAvatarWrapper } from '@/components/wrapper';
import { Button } from '@arco-design/web-react';
import { getIconNameByBlockType } from '@extensions';
import React from 'react';

export interface DragIconProps {
  type: string;
  payload?: any;
  color: string;
}

export function DragIcon(props: DragIconProps) {
  return (
    <BlockAvatarWrapper type={props.type} payload={props.payload}>
      <Button
        type='text'
        icon={
          <IconFont
            title='Text'
            iconName={getIconNameByBlockType(props.type)}
            style={{
              fontSize: 16,
              textAlign: 'center',
              cursor: 'move',
              color: props.color,
            }}
          />
        }
      />
    </BlockAvatarWrapper>
  );
}
