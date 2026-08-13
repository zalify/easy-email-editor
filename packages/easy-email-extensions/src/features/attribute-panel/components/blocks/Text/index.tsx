import React, { useState } from 'react';
import { Padding } from '../../attributes/Padding';
import { TextDecoration } from '../../attributes/TextDecoration';
import { FontWeight } from '../../attributes/FontWeight';
import { FontStyle } from '../../attributes/FontStyle';
import { FontFamily } from '../../attributes/FontFamily';
import { Height } from '../../attributes/Height';
import { ContainerBackgroundColor } from '../../attributes/ContainerBackgroundColor';
import { FontSize } from '../../attributes/FontSize';
import { Color } from '../../attributes/Color';
import { Align } from '../../attributes/Align';
import { LineHeight } from '../../attributes/LineHeight';
import { LetterSpacing } from '../../attributes/LetterSpacing';

import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Tooltip, Button } from '@arco-design/web-react';
import { IconFont } from 'easy-email-editor';
import { HtmlEditor } from '@extensions/features/attribute-panel/components/UI/HtmlEditor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';

export function Text() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={(
        <Tooltip content={t('Html mode')}>
          <Button
            onClick={() => setVisible(true)}
            icon={<IconFont iconName='icon-html' />}
          />
        </Tooltip>
      )}
    >
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item
          name='0'
          header={t('Dimension')}
        >
          <Space direction='vertical'>
            <Height />
            <Padding showResetAll />
          </Space>
        </Collapse.Item>
        <Collapse.Item
          name='1'
          header={t('Color')}
        >
          <Grid.Row>
            <Grid.Col span={11}>
              <Color />
            </Grid.Col>
            <Grid.Col
              offset={1}
              span={11}
            >
              <ContainerBackgroundColor title={t('Background color')} />
            </Grid.Col>
          </Grid.Row>
        </Collapse.Item>
        <Collapse.Item
          name='2'
          header={t('Typography')}
        >
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <FontFamily />
              </Grid.Col>
              <Grid.Col
                offset={1}
                span={11}
              >
                <FontSize />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <LineHeight />
              </Grid.Col>
              <Grid.Col
                offset={1}
                span={11}
              >
                <LetterSpacing />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <TextDecoration />
              </Grid.Col>
              <Grid.Col
                offset={1}
                span={11}
              >
                <FontWeight />
              </Grid.Col>
            </Grid.Row>

            <Align />

            <FontStyle />

            <Grid.Row>
              <Grid.Col span={11} />
              <Grid.Col
                offset={1}
                span={11}
              />
            </Grid.Row>
          </Space>
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
      <HtmlEditor
        visible={visible}
        setVisible={setVisible}
      />
    </AttributesPanelWrapper>
  );
}
