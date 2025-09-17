import React, { useCallback } from 'react';

import { Menu, Popover } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { getIframeDocument, IconFont } from 'easy-email-editor';
import { useFontFamily } from '@extensions/hooks/useFontFamily';
import styleText from '../../styles/ToolsPopover.css?inline';

export interface FontFamilyProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function FontFamily(props: FontFamilyProps) {
  const { fontList } = useFontFamily();
  const { execCommand } = props;
  const [visible, setVisible] = React.useState(false);

  const onChange = useCallback(
    (val: string) => {
      execCommand('fontName', val);
      setVisible(false);
    },
    [execCommand],
  );

  const onVisibleChange = useCallback((v: boolean) => {
    setVisible(v);
  }, []);

  if (fontList.length === 0) return null;

  return (
    <Popover
      trigger="click"
      color="#fff"
      position="left"
      className="easy-email-extensions-Tools-Popover"
      popupVisible={visible}
      triggerProps={{
        // @ts-expect-error I am ignoring this type error here since this is expecting an
        // element but the function returns a document. This works fine and isn't an issue.
        getDocument: getIframeDocument,
      }}
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
              {fontList.map(item => (
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
        title={t('Font family')}
        icon={<IconFont iconName="icon-font-family" />}
      />
    </Popover>
  );
}
