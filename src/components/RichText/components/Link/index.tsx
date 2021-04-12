import { Button, Input, message, Tooltip } from 'antd';
import React from 'react';
import { useState } from 'react';
import {
  LinkOutlined,
} from '@ant-design/icons';

export function Link(props: {
  onChange: (val: { link: string; target: '_blank' | ''; }) => void;
}) {
  const [val, setVal] = useState('');

  const onInsert = () => {
    if (!val) {
      return message.warning('Link required');
    }
    props.onChange({
      link: val,
      target: '_blank',
    });
  };

  return (
    <Tooltip
      color='#fff'
      placement="topLeft"
      overlayInnerStyle={{ color: '#333', width: 300 }}
      title={(
        <Input.Search onChange={(e) => setVal(e.target.value)} enterButton="Apply" placeholder="https://www.example.com" onSearch={onInsert} />

      )}
    >
      <Button size='small' icon={<LinkOutlined />} />
    </Tooltip>
  );
}

