import React from 'react';
import {
  ColorPickerField,
  EditTabField,
  SelectField,
  TextField,
} from '@extensions/components/Form';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import { NavbarLinkPadding } from '@extensions/AttributePanel/components/attributes/NavbarLinkPadding';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { INavbar } from 'easy-email-core';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { FontFamily, FontStyle, FontWeight, LetterSpacing, LineHeight, TextAlign, TextDecoration, TextTransform } from '../../attributes';

export function Navbar() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='0' header='Layout'>
          <Stack vertical spacing='tight'>
            <Align />
          </Stack>
        </Collapse.Item>

        <Collapse.Item
          contentStyle={{ padding: 0 }}
          name='1'
          header='Navbar links'
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <EditTabField
              tabPosition='top'
              name={`${focusIdx}.data.value.links`}
              label='Links'
              labelHidden
              renderItem={(item, index) => (
                <NavbarLink item={item} index={index} />
              )}
              additionItem={{
                src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
                target: '_blank',
                content: 'New link',
                color: '#1890ff',
                'font-size': '13px',
              }}
            />
            <div />
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

function NavbarLink({
  item,
  index,
}: {
  item: INavbar['data']['value']['links'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  return (
    <div className='NavbarLink'>
      <Space direction='vertical' style={{ width: '100%' }}>

        <Grid.Row>
          <Grid.Col span={11}>
            <TextField
              label='Content'
              name={`${focusIdx}.data.value.links.[${index}].content`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <ColorPickerField
              label='Color'
              name={`${focusIdx}.data.value.links.[${index}].color`}
              alignment='center'
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>

            <FontFamily name={`${focusIdx}.data.value.links.[${index}].font-family`} />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <TextField
              label='Font size'
              quickchange
              name={`${focusIdx}.data.value.links.[${index}].font-size`}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <LineHeight name={`${focusIdx}.data.value.links.[${index}].line-height`} />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <LetterSpacing name={`${focusIdx}.data.value.links.[${index}].letter-spacing`} />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <TextDecoration name={`${focusIdx}.data.value.links.[${index}].text-decoration`} />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <FontWeight name={`${focusIdx}.data.value.links.[${index}].font-weight`} />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <TextTransform name={`${focusIdx}.data.value.links.[${index}].text-transform`} />
          </Grid.Col>
          <Grid.Col offset={1} span={11} />
        </Grid.Row>
        <FontStyle name={`${focusIdx}.data.value.links.[${index}].font-style`} />
        <Grid.Row>
          <Grid.Col span={11}>
            <TextField
              prefix={<IconLink />}
              label={<span>Url</span>}
              name={`${focusIdx}.data.value.links.[${index}].href`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <SelectField
              style={{ minWidth: 65 }}
              label='Target'
              name={`${focusIdx}.data.value.links.[${index}].target`}
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
        <NavbarLinkPadding
          key={index}
          name={`${focusIdx}.data.value.links.[${index}].padding`}
        />
        <div />
      </Space>
    </div>
  );
}
