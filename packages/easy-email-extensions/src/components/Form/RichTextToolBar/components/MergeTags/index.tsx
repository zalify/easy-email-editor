import React, { useEffect } from 'react';

import { MergeTags as MergeTagsOptions } from '@extensions/AttributePanel';
import { Popover } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { IconFont } from 'easy-email-editor';

export interface MergeTagsProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function MergeTags(props: MergeTagsProps) {
  useEffect(() => {}, []);

  return (
    <Popover
      trigger='click'
      color='#fff'
      position='left'
      content={
        <MergeTagsOptions
          value=''
          onChange={(val) => props.execCommand('insertHTML', val)}
        />
      }
      getPopupContainer={props.getPopupContainer}
    >
      <ToolItem
        title='Merge tag'
        icon={<IconFont iconName='icon-merge-tags' />}
      />
    </Popover>
  );
}
