import React from 'react';
import { Stack } from 'easy-email-editor';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Collapse } from '@arco-design/web-react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';

export function Group() {
  return (
    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='0' header='Dimension'>
          <Stack vertical spacing='tight'>
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
            <BackgroundColor />
          </Stack>
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}
