import React from 'react';

import { Collapse, Grid, Space } from '@arco-design/web-react';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { Padding } from '../../attributes/Padding';
import { Width } from '../../attributes/Width';
import { VerticalAlign } from '../../attributes/VerticalAlign';
import { Background } from '../../attributes/Background';
import { Border } from '../../attributes/Border';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { BackgroundColor } from '../../attributes';

export function Column() {
  return (
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item
          name='0'
          header={t('Dimension')}
        >
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Width />
              </Grid.Col>
              <Grid.Col
                offset={1}
                span={11}
              >
                <VerticalAlign />
              </Grid.Col>
            </Grid.Row>

            <Padding />
          </Space>
        </Collapse.Item>
        <Collapse.Item
          name='1'
          header={t('Background')}
        >
          <BackgroundColor />
        </Collapse.Item>
        <Collapse.Item
          name='2'
          header={t('Border')}
        >
          <Border />
        </Collapse.Item>
        <Collapse.Item
          name='4'
          header={t('Extra')}
        >
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
