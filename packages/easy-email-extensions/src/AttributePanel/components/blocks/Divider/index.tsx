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

export function Divider() {
  return (
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['-1', '0', '1', '2', '3']}>
        <Collapse.Item name='1' header={t('Dimension')}>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Width unitOptions='percent' />
              </Grid.Col>
              <Grid.Col offset={1} span={11} />
            </Grid.Row>

            <Align />
            <Padding />
          </Space>
        </Collapse.Item>

        <Collapse.Item name='2' header={t('Border')}>
          <Stack wrap={false} spacing='tight'>
            <div style={{ width: 50 }}>
              <BorderWidth />
            </div>
            <div style={{ width: 100 }}>
              <BorderStyle />
            </div>
            <div style={{ width: 100 }}>
              <BorderColor />
            </div>
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='3' header={t('Background')}>
          <Grid.Row>
            <Grid.Col span={11}>
              <ContainerBackgroundColor title={t('Background')} />
            </Grid.Col>
            <Grid.Col offset={1} span={11} />
          </Grid.Row>
        </Collapse.Item>
        <Collapse.Item name='4' header={t('Extra')}>
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
