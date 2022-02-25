import React, { useContext } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  ColorPickerField,
  ImageUploaderField,
  TextField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { Link } from '@extensions/AttributePanel/components/attributes/Link';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';

export function Image() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper defaultActiveKey={['0', '1', '2', '3', '4']}>
        <Collapse.Item name='1' header='Setting'>
          <Stack vertical spacing='tight'>
            <ImageUploaderField
              label='src'
              labelHidden
              name={`${focusIdx}.attributes.src`}
              helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
              uploadHandler={onUploadImage}
            />
            <ColorPickerField
              label='Background color'
              name={`${focusIdx}.attributes.container-background-color`}
              inline
              alignment='center'
            />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='0' header='Dimension'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Width />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <Height />
              </Grid.Col>
            </Grid.Row>

            <Padding />
            <Grid.Row>
              <Grid.Col span={24}>
                <Align />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Collapse.Item>

        <Collapse.Item name='2' header='Link'>
          <Stack vertical spacing='tight'>
            <Link />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='3' header='Border'>
          <Border />
        </Collapse.Item>

        <Collapse.Item name='4' header='Extra'>
          <Grid.Row>
            <Grid.Col span={11}>
              <TextField label='title' name={`${focusIdx}.attributes.title`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <TextField label='alt' name={`${focusIdx}.attributes.alt`} />
            </Grid.Col>
          </Grid.Row>
          <Grid.Col span={24}>
            <TextField
              label='class name'
              name={`${focusIdx}.attributes.css-class`}
            />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
