import { Menu } from 'antd';
import React from 'react';

export function Heading(props: { onChange: (val: string) => void; }) {
  const list = [
    {
      value: 'H1',
      label: 'H1',
    },
    {
      value: 'H2',
      label: 'H3',
    },
    {
      value: 'H3',
      label: 'H3',
    },
    {
      value: 'H4',
      label: 'H4',
    },
    {
      value: 'H5',
      label: 'H5',
    },
    {
      value: 'H6',
      label: 'H6',
    },
    {
      value: 'P',
      label: 'Paragraph',
    },
  ];
  return (
    <Menu
      onClick={(item) => {
        props.onChange(item.key as string);
      }}
      selectedKeys={[]}
      style={{ width: 100, border: 'none' }}
    >
      {list.map((item) => (
        <Menu.Item style={{ lineHeight: '30px', height: 30 }} key={item.value}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
}
