import React, { useCallback } from 'react';

import { Menu, Popover } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { IconFont, useEditorProps } from 'easy-email-editor';
import styleText from '../../styles/ToolsPopover.css?inline';

const list = ['12px', '13px', '16px', '18px', '24px', '32px', '48px'];

export interface FontSizeProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function FontSize(props: FontSizeProps) {
  const { execCommand } = props;
  const { fontSizeList } = useEditorProps();

  const [visible, setVisible] = React.useState(false);

  const currentfontSizeList = fontSizeList?.length ? fontSizeList : list;

  const onChange = useCallback(
    (val: string) => {
      execCommand('fontSize', val);
      setVisible(false);
    },
    [execCommand],
  );

  const onVisibleChange = useCallback((v: boolean) => {
    setVisible(v);
  }, []);

  return (
    <Popover
      trigger='click'
      color='#fff'
      position='left'
      className='easy-email-extensions-Tools-Popover'
      popupVisible={visible}
      onVisibleChange={onVisibleChange}
      content={(
        <>
          <style>{styleText}</style>
          <div
            style={{
              maxWidth: 150,
              maxHeight: 350,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <Menu
              onClickMenuItem={onChange}
              selectedKeys={[]}
              style={{ border: 'none', padding: 0 }}
            >
              {currentfontSizeList.map(item => (
                <Menu.Item
                  style={{ lineHeight: '30px', height: 30 }}
                  key={item}
                >
                  {item}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </>
      )}
      getPopupContainer={props.getPopupContainer}
    >
      <ToolItem
        title={t('Font size')}
        icon={<IconFont iconName='icon-font-color' />}
      />
    </Popover>
  );
}
