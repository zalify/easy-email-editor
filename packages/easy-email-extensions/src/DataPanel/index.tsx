import { Input, Space } from '@arco-design/web-react';
import React, { } from 'react';

export function DataPanel({ dataObjects }: { dataObjects: Array<Record<string, any>>; }) {
  const listItems = dataObjects.map((dataObject, index) => (
    <Space key={index} wrap style={{ padding: 10 }}>
      <Input defaultValue={dataObject.key} style={{ minHeight: 28, width: 158 }} disabled />
      <Input placeholder={dataObject.value} style={{ minHeight: 28, width: 158 }} />
    </Space>
  )
  );
  return (
    <div style={{ paddingTop: 30, minHeight: '100%' }}>
      {listItems}
    </div>
  );
}
