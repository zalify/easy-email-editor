import React from 'react';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse } from 'antd';
import { Stack } from 'easy-email-editor';

export function Spacer() {
  return (
    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['-1', '0', '1', '2', '3']}>

        <Collapse.Panel key="1" header="Dimension">
          <Stack vertical>
            <Height />
            <Padding />
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key="2" header="Background">
          <ContainerBackgroundColor title="Background color" />
        </Collapse.Panel>

      </Collapse>
    </AttributesPanelWrapper>
  );
}
