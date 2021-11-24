import { Menu } from 'antd';
import { useEditorProps } from 'easy-email-editor';
import React from 'react';

export function FontFamily(props: { onChange: (val: string) => void }) {
  const { fontList = [] } = useEditorProps();
  return (
    <div
      style={{
        width: 100,
        maxHeight: 350,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Menu
        onClick={(item) => {
          props.onChange(item.key);
        }}
        selectedKeys={[]}
        style={{ border: 'none' }}
      >
        {fontList.map((item) => (
          <Menu.Item
            style={{ lineHeight: '30px', height: 30 }}
            key={item.value}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
