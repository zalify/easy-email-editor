import { Background } from '@extensions/AttributePanel/components/attributes//Background';
import { Padding } from '@extensions/AttributePanel/components/attributes//Padding';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import React from 'react';
import Collapsible from '../../UI/Collapsible';

export function Wrapper() {
  // const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapsible title='Dimension'>
        <Padding />
      </Collapsible>
      <Collapsible title='Background'>
        <Background />
      </Collapsible>
      {/* <Collapsible title='Border'>
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
      </Collapsible> */}
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
