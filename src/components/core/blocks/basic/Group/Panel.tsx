import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { BackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { VerticalAlign } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/VerticalAlign';

import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';

export function Panel() {
  return (

    <AttributesPanelWrapper>

      <Collapse defaultActiveKey={['0', '1', '2']}>

        <Collapse.Panel key="0" header="Dimension">
          <Stack vertical spacing="tight">

            <Stack wrap={false}>
              <Stack.Item fill>
                <Width />
              </Stack.Item>
              <VerticalAlign />
            </Stack>

          </Stack>

        </Collapse.Panel>
        <Collapse.Panel key="1" header="Background">
          <Stack vertical spacing="tight">
            <BackgroundColor />
          </Stack>
        </Collapse.Panel>

      </Collapse>

    </AttributesPanelWrapper>
  );
}
