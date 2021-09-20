import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { ContainerBackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { BorderWidth } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BorderWidth';
import { BorderStyle } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BorderStyle';
import { BorderColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BorderColor';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Align } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Align';

import { AttributesPanel } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/AttributesPanel';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';
export function Panel() {
  return (

    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['-1', '0', '1', '2', '3']}>

        <Collapse.Panel key="1" header="Dimension">
          <Width inline />
          <Align />
          <Padding />
        </Collapse.Panel>

        <Collapse.Panel key="2" header="Border">
          <Stack wrap={false} spacing="tight">
            <div style={{ width: 50 }}><BorderWidth /></div>
            <div style={{ width: 100 }}><BorderStyle /></div>
            <div style={{ width: 100 }}><BorderColor /></div>
          </Stack>

        </Collapse.Panel>

        <Collapse.Panel key="3" header="Background">
          <ContainerBackgroundColor title="Background color" />
        </Collapse.Panel>

      </Collapse>
    </AttributesPanelWrapper>
  );
}
