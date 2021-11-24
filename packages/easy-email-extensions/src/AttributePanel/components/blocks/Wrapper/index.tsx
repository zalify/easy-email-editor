import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes//Padding';
import { Background } from '@extensions/AttributePanel/components/attributes//Background';
import { TextField } from '@extensions/components/Form';
;
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse } from 'antd';
import { Stack, useFocusIdx } from 'easy-email-editor';

export function Wrapper() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Panel key="0" header="Dimension">
          <Stack vertical spacing="tight">
            <Padding />
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key="1" header="Background">
          <Stack vertical spacing="tight">
            <Background />
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key="2" header="Border">
          <Stack vertical spacing="tight">
            <TextField
              label='Border'
              name={`${focusIdx}.attributes.border`}
              inline
            />
            <TextField
              label='Background border radius'
              name={`${focusIdx}.attributes.border-radius`}
              inline
            />
          </Stack>
        </Collapse.Panel>
      </Collapse>

    </AttributesPanelWrapper>
  );
}
