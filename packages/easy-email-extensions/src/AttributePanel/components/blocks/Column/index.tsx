import React from 'react';

import { Collapse } from '@arco-design/web-react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Stack } from 'easy-email-editor';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Background } from '@extensions/AttributePanel/components/attributes/Background';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';

export function Column() {
  return (
    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <Padding />
            <Stack wrap={false}>
              <Stack.Item fill>
                <Width />
              </Stack.Item>
              <VerticalAlign />
            </Stack>
          </Stack>
        </Collapse.Item>
        <Collapse.Item name='1' header='Background'>
          <Stack vertical spacing='tight'>
            <Background />
          </Stack>
        </Collapse.Item>
        <Collapse.Item name='2' header='Border'>
          <Stack vertical spacing='tight'>
            <Border />
          </Stack>
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}
