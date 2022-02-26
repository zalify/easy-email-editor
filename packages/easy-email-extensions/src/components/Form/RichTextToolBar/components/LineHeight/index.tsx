import React, { useCallback, useEffect } from 'react';

import { Popover } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { IconFont } from 'easy-email-editor';
import { FontSizeList } from '../FontSizeList';
import styleText from '../../styles/ToolsPopover.css?inline';

export interface LineHeightProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function LineHeight(props: LineHeightProps) {
  const { execCommand } = props;
  const [visible, setVisible] = React.useState(false);

  const onChange = useCallback((val: string) => {
    execCommand('fontSize', val);
    setVisible(false);
  }, [execCommand]);

  const onVisibleChange = useCallback((v: boolean) => {
    setVisible(v);
  }, []);

  return (
    <Popover
      trigger='click'
      color='#fff'
      className='easy-email-extensions-Tools-Popover'
      position='left'
      popupVisible={visible}
      onVisibleChange={onVisibleChange}
      content={(
        <>
          <style>{styleText}</style>
          <FontSizeList onChange={onChange} />
        </>
      )}
      getPopupContainer={props.getPopupContainer}
    >
      <ToolItem
        title='Line height'
        icon={<IconFont iconName='icon-line-height' />}
      />
    </Popover>
  );
}
