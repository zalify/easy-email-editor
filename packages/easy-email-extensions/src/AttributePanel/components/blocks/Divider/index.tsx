import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { BorderWidth } from '@extensions/AttributePanel/components/attributes/BorderWidth';
import { BorderStyle } from '@extensions/AttributePanel/components/attributes/BorderStyle';
import { BorderColor } from '@extensions/AttributePanel/components/attributes/BorderColor';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack } from 'easy-email-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import Collapsible from '../../UI/Collapsible';
import { InlineGrid } from '@shopify/polaris';

export function Divider() {
  return (
    <AttributesPanelWrapper>
      <Collapsible title='Dimension'>
        <InlineGrid columns={1}>
          <Width unitOptions='percent' />
          <Align />
          <Padding />
        </InlineGrid>
      </Collapsible>

      <Collapsible title='Border'>
        <InlineGrid
          columns={2}
          gap='300'
        >
          <BorderWidth />
          <BorderStyle />
        </InlineGrid>
        <BorderColor />
      </Collapsible>

      <Collapsible title='Background'>
        <ContainerBackgroundColor title='Background color' />
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
