import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  ColorPickerField,
  ImageUploaderField,
  SwitchField,
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
import { imageHeightAdapter, pixelAdapter } from '../../adapter';

const fullWidthOnMobileAdapter = {
  format(obj: any) {
    return Boolean(obj);
  },
  parse(val: string) {
    if (!val) return undefined;

    return 'true';
  },
};

export function Image() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper defaultActiveKey={['0', '1', '2', '3', '4']}>
        <Collapse.Item
          name='1'
          header={t('Setting')}
        >
          <Stack
            vertical
            spacing='tight'
          >
            <ImageUploaderField
              label={t('src')}
              labelHidden
              name={`${focusIdx}.attributes.src`}
              helpText={t(
                'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.',
              )}
              uploadHandler={onUploadImage}
            />
            <ColorPickerField
              label={t('Background color')}
              name={`${focusIdx}.attributes.container-background-color`}
              inline
            />
            <SwitchField
              label={t('Full width on mobile')}
              name={`${focusIdx}.attributes.fluid-on-mobile`}
              config={fullWidthOnMobileAdapter}
            />
          </Stack>
        </Collapse.Item>

        <Collapse.Item
          name='0'
          header={t('Dimension')}
        >
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Width config={pixelAdapter} />
              </Grid.Col>
              <Grid.Col
                offset={1}
                span={11}
              >
                <Height config={imageHeightAdapter} />
              </Grid.Col>
            </Grid.Row>

            <Padding showResetAll />
            <Grid.Row>
              <Grid.Col span={24}>
                <Align />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Collapse.Item>

        <Collapse.Item
          name='2'
          header={t('Link')}
        >
          <Stack
            vertical
            spacing='tight'
          >
            <Link />
          </Stack>
        </Collapse.Item>

        <Collapse.Item
          name='3'
          header={t('Border')}
        >
          <Border />
        </Collapse.Item>

        <Collapse.Item
          name='4'
          header={t('Extra')}
        >
          <Grid.Row>
            <Grid.Col span={11}>
              <TextField
                label={t('title')}
                name={`${focusIdx}.attributes.title`}
              />
            </Grid.Col>
            <Grid.Col
              offset={1}
              span={11}
            >
              <TextField
                label={t('alt')}
                name={`${focusIdx}.attributes.alt`}
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Col span={24}>
            <TextField
              label={t('class name')}
              name={`${focusIdx}.attributes.css-class`}
            />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
