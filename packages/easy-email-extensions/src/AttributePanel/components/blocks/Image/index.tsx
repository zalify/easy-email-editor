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
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Image() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  const { t } = useTranslation();

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper defaultActiveKey={['0', '1', '2', '3', '4']}>
        <Collapse.Item name='1' header={t('image.setting')}>
          <Stack vertical spacing='tight'>
            <ImageUploaderField
              label={t('image.src')}
              labelHidden
              name={`${focusIdx}.attributes.src`}
              helpText={t('image.srcHelp')}
              uploadHandler={onUploadImage}
            />
            <ColorPickerField
              label={t('image.backgroundColor')}
              name={`${focusIdx}.attributes.container-background-color`}
              inline
              alignment='center'
            />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='0' header={t('image.dimension')}>
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

        <Collapse.Item name='2' header={t('image.link')}>
          <Stack vertical spacing='tight'>
            <Link />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='3' header={t('image.border')}>
          <Border />
        </Collapse.Item>

        <Collapse.Item name='4' header={t('image.extra')}>
          <Grid.Row>
            <Grid.Col span={11}>
              <TextField label={t('image.title')} name={`${focusIdx}.attributes.title`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <TextField label={t('image.alt')} name={`${focusIdx}.attributes.alt`} />
            </Grid.Col>
          </Grid.Row>
          <Grid.Col span={24}>
            <TextField
              label={t('image.className')}
              name={`${focusIdx}.attributes.css-class`}
            />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
