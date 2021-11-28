import React from 'react';
import { Stack } from 'easy-email-editor';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Collapse } from 'antd';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';

export function Group() {
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
