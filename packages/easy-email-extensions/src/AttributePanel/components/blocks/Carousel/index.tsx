import React from 'react';
import {
  ColorPickerField,
  EditTabField,
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@extensions/components/Form';
import { IconLink } from '@arco-design/web-react/icon';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { ICarousel } from 'easy-email-core';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { useTranslation } from '@extensions/hooks/useTranslation';

const options = [
  {
    value: 'hidden',
    label: 'hidden',
  },
  {
    value: 'visible',
    label: 'visible',
  },
];

export function Carousel() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper defaultActiveKey={['0', '1', '2', '3', '4']}>
        <Collapse.Item name='0' header={t('carousel.dimension')}>
          <Space direction='vertical'>
            <InputWithUnitField
              label={t('carousel.thumbnailWidth')}
              name={`${focusIdx}.attributes.tb-width`}
              quickchange
              inline
            />

            <RadioGroupField
              label={t('carousel.thumbnails')}
              name={`${focusIdx}.attributes.thumbnails`}
              options={options}
              inline
            />
            <Align inline />
          </Space>
        </Collapse.Item>
        <Collapse.Item name='4' contentStyle={{ padding: 0 }} header={t('carousel.images')}>
          <Stack vertical spacing='tight'>
            <EditTabField
              tabPosition='top'
              name={`${focusIdx}.data.value.images`}
              label=''
              labelHidden
              renderItem={(item, index) => (
                <CarouselImage item={item} index={index} />
              )}
              additionItem={{
                src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
                target: '_blank',
              }}
            />
          </Stack>
        </Collapse.Item>
        <Collapse.Item name='3' header={t('carousel.icon')}>
          <Grid.Row>
            <Grid.Col span={11}>
              <TextField
                label={t('carousel.leftIcon')}
                name={`${focusIdx}.attributes.left-icon`}
              />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <TextField
                label={t('carousel.rightIcon')}
                name={`${focusIdx}.attributes.right-icon`}
              />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col span={11}>
              <InputWithUnitField
                label={t('carousel.iconWidth')}
                name={`${focusIdx}.attributes.icon-width`}
              />
            </Grid.Col>
            <Grid.Col offset={1} span={11} />
          </Grid.Row>
        </Collapse.Item>

        <Collapse.Item name='1' header={t('carousel.border')}>
          <Grid.Row>
            <Grid.Col span={11}>
              <ColorPickerField
                label={t('carousel.hoveredBorder')}
                name={`${focusIdx}.attributes.tb-hover-border-color`}
                alignment='center'
              />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <ColorPickerField
                label={t('carousel.selectedBorder')}
                name={`${focusIdx}.attributes.tb-selected-border-color`}
                alignment='center'
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={11}>
              <TextField
                label={t('carousel.thumbnailsBorder')}
                name={`${focusIdx}.attributes.tb-border`}
              />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <TextField
                label={t('carousel.thumbnailsBorderRadius')}
                name={`${focusIdx}.attributes.tb-border-radius`}
              />
            </Grid.Col>
          </Grid.Row>
        </Collapse.Item>
        <Collapse.Item name='4' header={t('carousel.extra')}>
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}

function CarouselImage({
  item,
  index,
}: {
  item: ICarousel['data']['value']['images'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  const { t } = useTranslation();

  return (
    <Space direction='vertical'>
      <ImageUploaderField
        label={t('carousel.image')}
        labelHidden
        name={`${focusIdx}.data.value.images.[${index}].src`}
        helpText={t('carousel.imageHelper')}
        uploadHandler={onUploadImage}
      />
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            prefix={<IconLink />}
            label={t('carousel.url')}
            name={`${focusIdx}.data.value.images.[${index}].href`}
          />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <SelectField
            label={t('carousel.target')}
            name={`${focusIdx}.data.value.images.[${index}].target`}
            options={[
              {
                value: '',
                label: '_self',
              },
              {
                value: '_blank',
                label: '_blank',
              },
            ]}
          />
        </Grid.Col>
      </Grid.Row>

      <TextField
        label={t('carousel.title')}
        name={`${focusIdx}.data.value.image.[${index}].title`}
      />
    </Space>
  );
}
