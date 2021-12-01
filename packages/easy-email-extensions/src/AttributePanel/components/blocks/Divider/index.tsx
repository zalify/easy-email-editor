import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { BorderWidth } from '@extensions/AttributePanel/components/attributes/BorderWidth';
import { BorderStyle } from '@extensions/AttributePanel/components/attributes/BorderStyle';
import { BorderColor } from '@extensions/AttributePanel/components/attributes/BorderColor';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse } from '@arco-design/web-react';
import { Stack } from 'easy-email-editor';

export function Divider() {
  return (
    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['-1', '0', '1', '2', '3']}>
        <Collapse.Item name='1' header='Dimension'>
          <Width inline />
          <Align />
          <Padding />
        </Collapse.Item>

        <Collapse.Item name='2' header='Border'>
          <Stack wrap={false} spacing='tight'>
            <div style={{ width: 50 }}>
              <BorderWidth />
            </div>
            <div style={{ width: 100 }}>
              <BorderStyle />
            </div>
            <div style={{ width: 100 }}>
              <BorderColor />
            </div>
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='3' header='Background'>
          <ContainerBackgroundColor title='Background color' />
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}
