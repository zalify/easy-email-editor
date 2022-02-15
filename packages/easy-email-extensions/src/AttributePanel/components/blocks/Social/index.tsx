import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  EditTabField,
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@extensions/components/Form';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { IconLink } from '@arco-design/web-react/icon';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { FontSize } from '@extensions/AttributePanel/components/attributes/FontSize';
import { FontStyle } from '@extensions/AttributePanel/components/attributes/FontStyle';
import { FontWeight } from '@extensions/AttributePanel/components/attributes/FontWeight';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { ISocial } from 'easy-email-core';
import { getImg } from '@extensions/AttributePanel/utils/getImg';
import { ClassName } from '../../attributes/ClassName';

const options = [
  {
    value: 'vertical',
    label: 'vertical',
  },
  {
    value: 'horizontal',
    label: 'horizontal',
  },
];

export function Social() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='1' header='Setting'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <RadioGroupField
                  label='Mode'
                  name={`${focusIdx}.attributes.mode`}
                  options={options}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <ContainerBackgroundColor title='Background color' />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Collapse.Item>

        <Collapse.Item name='3' header='Typography'>
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
                <Color inline={false} />
              </Grid.Col>
            </Grid.Row>
            <FontStyle />
          </Space>
        </Collapse.Item>

        <Collapse.Item
          name='2'
          header='Social item'
          contentStyle={{ padding: 0 }}
        >
          <EditTabField
            tabPosition='top'
            name={`${focusIdx}.data.value.elements`}
            label=''
            labelHidden
            renderItem={(item, index) => (
              <SocialElement item={item} index={index} />
            )}
            additionItem={{
              href: '',
              'icon-size': '20px',
              target: '_blank',
              src: getImg('AttributePanel_01'),
              content: 'Google',
            }}
          />
        </Collapse.Item>

        <Collapse.Item name='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <Align />
            <TextField
              label='Border radius'
              name={`${focusIdx}.attributes.border-radius`}
              inline
            />
            <Padding />
            <Padding attributeName='inner-padding' title='Inner padding' />
            <Padding attributeName='text-padding' title='Text padding' />
          </Stack>
        </Collapse.Item>
        <Collapse.Item name='4' header='Extra'>
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}

function SocialElement({
  index,
}: {
  item: ISocial['data']['value']['elements'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <Space direction='vertical'>
      <ImageUploaderField
        label='Image'
        labelHidden
        name={`${focusIdx}.data.value.elements.[${index}].src`}
        helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
        uploadHandler={onUploadImage}
      />

      <TextField
        label='Content'
        name={`${focusIdx}.data.value.elements.[${index}].content`}
        quickchange
      />

      <Grid.Row>
        <Grid.Col span={11}>
          <InputWithUnitField
            label='Icon width'
            name={`${focusIdx}.data.value.elements.[${index}].icon-size`}
          />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <InputWithUnitField
            label='Icon height'
            name={`${focusIdx}.data.value.elements.[${index}].icon-height`}
          />
        </Grid.Col>
      </Grid.Row>

      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            prefix={<IconLink />}
            label='Url'
            name={`${focusIdx}.data.value.elements.[${index}].href`}
          />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <SelectField
            style={{ minWidth: 65 }}
            label='Target'
            name={`${focusIdx}.data.value.elements.[${index}].target`}
            options={[
              {
                value: '_blank',
                label: '_blank',
              },
              {
                value: '_self',
                label: '_self',
              },
            ]}
          />
        </Grid.Col>
      </Grid.Row>
    </Space>
  );
}
