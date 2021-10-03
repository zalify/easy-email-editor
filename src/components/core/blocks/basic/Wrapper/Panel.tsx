import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Background } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Background';
import { Stack } from '@/components/UI/Stack';
import { TextField } from '@/components/core/Form';

import { useFocusIdx } from '@/hooks/useFocusIdx';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';

export function Panel() {
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
