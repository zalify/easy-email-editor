import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes//Padding';
import { Background } from '@extensions/AttributePanel/components/attributes//Background';
import { TextField } from '@extensions/components/Form';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid } from '@arco-design/web-react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import Collapsible from '../../UI/Collapsible';

export function Wrapper() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapsible title='Dimension'>
        <Stack
          vertical
          spacing='tight'
        >
          <Padding />
        </Stack>
      </Collapsible>
      <Collapsible title='Background'>
        <Stack
          vertical
          spacing='tight'
        >
          <Background />
        </Stack>
      </Collapsible>
      <Collapsible title='Border'>
        <Stack
          vertical
          spacing='tight'
        >
          <TextField
            label={t('Border')}
            name={`${focusIdx}.attributes.border`}
            inline
          />
          <TextField
            label={t('Background border radius')}
            name={`${focusIdx}.attributes.border-radius`}
            inline
          />
        </Stack>
      </Collapsible>
      {/* <Collapse.Item
        name='4'
        header={t('Extra')}
      >
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </Collapse.Item> */}
    </AttributesPanelWrapper>
  );
}
