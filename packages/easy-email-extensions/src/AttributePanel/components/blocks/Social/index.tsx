import React, { useMemo } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  EditGridTabField,
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
import { Button, Card, Collapse, Dropdown, Grid, Menu, Popover, Space, Typography } from '@arco-design/web-react';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { Stack, useBlock, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { ISocial } from 'easy-email-core';
import { getImg } from '@extensions/AttributePanel/utils/getImg';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';

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
  const { focusBlock } = useBlock();
  const value = focusBlock?.data.value as ISocial['data']['value'];
  if (!value) return null;

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper defaultActiveKey={['0', '1', '2', '3']}>
        <Collapse.Item name='1' header='Setting'>
          <Space direction='vertical'>
            <RadioGroupField
              label='Mode'
              name={`${focusIdx}.attributes.mode`}
              options={options}
            />

            <Align />

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
                <Color />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>

                <ContainerBackgroundColor title='Background color' />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col span={11}>
                <TextDecoration />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontStyle />
              </Grid.Col>
            </Grid.Row>

          </Space>
        </Collapse.Item>

        <Collapse.Item
          name='2'
          header='Social item'
          contentStyle={{ padding: 10 }}
        >

          <EditGridTabField
            tabPosition='top'
            name={`${focusIdx}.data.value.elements`}
            label=''
            labelHidden
            renderItem={(item, index) => (
              <SocialElement item={item} index={index} />
            )}
          />
        </Collapse.Item>

        <Collapse.Item name='0' header='Dimension'>

          <Space direction="vertical" size="large">

            <Grid.Row>
              <Grid.Col span={11}>
                <InputWithUnitField
                  label='Icon width'
                  name={`${focusIdx}.attributes.icon-size`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <TextField
                  label='Border radius'
                  name={`${focusIdx}.attributes.border-radius`}
                />
              </Grid.Col>
            </Grid.Row>

            <Padding />
            <Padding attributeName='inner-padding' title='Icon padding' />
            <Padding attributeName='text-padding' title='Text padding' />
          </Space>

        </Collapse.Item>
        <Collapse.Item name='4' header='Extra'>
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}

function SocialElement({
  index,
}: {
  item: ISocial['data']['value']['elements'][0];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage, socialIcons } = useEditorProps();

  const autoCompleteOptions = useMemo(() => {
    if (!socialIcons) return undefined;
    return socialIcons.map((icon) => {
      return {
        label: icon.content,
        value: icon.image
      };
    });
  }, [socialIcons]);

  return (
    <Space direction='vertical'>
      <ImageUploaderField
        label='Image'
        autoCompleteOptions={autoCompleteOptions}
        labelHidden
        name={`${focusIdx}.data.value.elements.[${index}].src`}
        // helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
        uploadHandler={onUploadImage}
      />

      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            label='Content'
            name={`${focusIdx}.data.value.elements.[${index}].content`}
            quickchange
          />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <TextField
            prefix={<IconLink />}
            label='Link'
            name={`${focusIdx}.data.value.elements.[${index}].href`}
          />
        </Grid.Col>
      </Grid.Row>
      {/* <Grid.Row>
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
      </Grid.Row> */}

    </Space>
  );
}
