import React from 'react';
import { Padding } from '../../attributes/Padding';
import { Border } from '../../attributes/Border';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Color } from '../../attributes/Color';
import { Link } from '../../attributes/Link';
import { Width } from '../../attributes/Width';
import { ContainerBackgroundColor } from '../../attributes/ContainerBackgroundColor';
import { Align } from '../../attributes/Align';
import { FontSize } from '../../attributes/FontSize';
import { FontStyle } from '../../attributes/FontStyle';
import { FontWeight } from '../../attributes/FontWeight';
import { FontFamily } from '../../attributes/FontFamily';
import { TextDecoration } from '../../attributes/TextDecoration';
import { LineHeight } from '../../attributes/LineHeight';
import { LetterSpacing } from '../../attributes/LetterSpacing';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { TextField } from '../../../../components/Form';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';

export function Button() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['-1', '0', '1', '2', '3']}>
        <Collapse.Item name='-1' header='Setting'>
          <Space direction='vertical'>
            <TextField
              label='Content'
              name={`${focusIdx}.data.value.content`}
            />
            <Link />
          </Space>
        </Collapse.Item>

        <Collapse.Item name='0' header='Dimension'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Width />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontWeight />
              </Grid.Col>
            </Grid.Row>

            <Padding title='Padding' attributeName='padding' />
            <Padding title='Inner padding' attributeName='inner-padding' />
          </Space>
        </Collapse.Item>

        <Collapse.Item name='1' header='Color'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Color title='Text color' />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <BackgroundColor title='Button color' />
              </Grid.Col>
              <Grid.Col span={11}>
                <ContainerBackgroundColor title='Background color' />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Collapse.Item>

        <Collapse.Item name='2' header='Typography'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <FontFamily />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontSize />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <FontWeight />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <LineHeight />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <TextDecoration />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <LetterSpacing />
              </Grid.Col>
            </Grid.Row>
            <Align />

            <FontStyle />
          </Space>
        </Collapse.Item>

        <Collapse.Item name='3' header='Border'>
          <Border />
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}
