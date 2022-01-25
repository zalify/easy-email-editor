import { Menu } from '@arco-design/web-react';
import { useFontFamily } from '@extensions/hooks/useFontFamily';
import React from 'react';

export function FontFamily(props: { onChange: (val: string) => void; }) {
  const { fontList } = useFontFamily();
  return (
    <div
      style={{
        maxWidth: 150,
        maxHeight: 350,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Menu
        onClickMenuItem={(item) => {
          props.onChange(item);
        }}
        selectedKeys={[]}
        style={{ border: 'none', padding: 0 }}
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
