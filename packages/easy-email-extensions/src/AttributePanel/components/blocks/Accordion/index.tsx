import React from 'react';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@extensions/components/Form';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';

const positionOptions = [
  {
    value: 'left',
    label: 'Left',
  },
  {
    value: 'right',
    label: 'Right',
  },
];

const alignOptions = [
  {
    value: 'top',
    label: 'top',
  },
  {
    value: 'middle',
    label: 'middle',
  },
  {
    value: 'bottom',
    label: 'bottom',
  },
];

export function Accordion() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='0' header='Setting'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <BackgroundColor />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontFamily />
              </Grid.Col>
            </Grid.Row>

            <Padding />

            <Grid.Row>
              <Grid.Col span={11}>
                <InputWithUnitField
                  label='Icon width'
                  name={`${focusIdx}.attributes.icon-width`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <InputWithUnitField
                  label='Icon height'
                  name={`${focusIdx}.attributes.icon-height`}
                />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <ImageUploaderField
                  label='Unwrapped icon'
                  name={`${focusIdx}.attributes.icon-unwrapped-url`}
                  // helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
                  uploadHandler={onUploadImage}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <ImageUploaderField
                  label='Wrapped icon'
                  name={`${focusIdx}.attributes.icon-wrapped-url`}
                  uploadHandler={onUploadImage}
                />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <RadioGroupField
                  label='Icon position'
                  name={`${focusIdx}.attributes.icon-position`}
                  options={positionOptions}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <SelectField
                  style={{ width: 120 }}
                  label='Icon align'
                  name={`${focusIdx}.attributes.icon-align`}
                  options={alignOptions}
                />
              </Grid.Col>
            </Grid.Row>

            <TextField label='border' name={`${focusIdx}.attributes.border`} />
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
