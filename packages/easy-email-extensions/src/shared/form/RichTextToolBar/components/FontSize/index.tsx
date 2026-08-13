import React, { useCallback } from 'react';

import { Menu, Popover } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { IconFont } from 'easy-email-editor';
import styleText from '../../styles/ToolsPopover.css?inline';

const list = [
  {
    value: '1',
    label: '12px',
  },
  {
    value: '2',
    label: '13px',
  },
  {
    value: '3',
    label: '16px',
  },
  {
    value: '4',
    label: '18px',
  },
  {
    value: '5',
    label: '24px',
  },
  {
    value: '6',
    label: '32px',
  },
  {
    value: '7',
    label: '48px',
  },
];

export interface FontSizeProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function FontSize(props: FontSizeProps) {
  const { execCommand } = props;
  const [visible, setVisible] = React.useState(false);

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
              {list.map(item => (
                <Menu.Item
                  style={{ lineHeight: '30px', height: 30 }}
                  key={item.value}
                >
                  {item.label}
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
