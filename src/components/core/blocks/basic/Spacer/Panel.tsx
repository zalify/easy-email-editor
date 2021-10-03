import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { Height } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { ContainerBackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';

export function Panel() {
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
