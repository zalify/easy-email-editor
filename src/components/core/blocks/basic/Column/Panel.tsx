import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Background } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Background';
import { Stack } from '@/components/UI/Stack';
import { Border } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { VerticalAlign } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/VerticalAlign';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';

export function Panel() {
  return (
    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Panel key='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <Padding />
            <Stack wrap={false}>
              <Stack.Item fill>
                <Width />
              </Stack.Item>
              <VerticalAlign />
            </Stack>
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key='1' header='Background'>
          <Stack vertical spacing='tight'>
            <Background />
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key='2' header='Border'>
          <Stack vertical spacing='tight'>
            <Border />
          </Stack>
        </Collapse.Panel>
      </Collapse>
    </AttributesPanelWrapper>
  );
}
