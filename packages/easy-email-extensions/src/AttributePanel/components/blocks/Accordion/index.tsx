import React, { useMemo } from 'react';
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
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Accordion() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  const { t } = useTranslation();

  const [positionOptions, alignOptions] = useMemo(() => {
    return [
      [
        {
          value: 'left',
          label: t('accordion.left')
        },
        {
          value: 'right',
          label:  t('accordion.right')
        },
      ],
      [
        {
          value: 'top',
          label:  t('accordion.top')
        },
        {
          value: 'middle',
          label:  t('accordion.middle')
        },
        {
          value: 'bottom',
          label:  t('accordion.bottom')
        },
      ]
  ]

  }, [t]);

  return (
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='0' header={t('accordion.setting')}>
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
                  label={t('accordion.iconWidth')}
                  name={`${focusIdx}.attributes.icon-width`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <InputWithUnitField
                  label={t('accordion.iconHeight')}
                  name={`${focusIdx}.attributes.icon-height`}
                />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <ImageUploaderField
                  label={t('accordion.unwrappedIcon')}
                  name={`${focusIdx}.attributes.icon-unwrapped-url`}
                  // helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
                  uploadHandler={onUploadImage}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <ImageUploaderField
                  label={t('accordion.wrappedIcon')}
                  name={`${focusIdx}.attributes.icon-wrapped-url`}
                  uploadHandler={onUploadImage}
                />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <RadioGroupField
                  label={t('accordion.iconPosition')}
                  name={`${focusIdx}.attributes.icon-position`}
                  options={positionOptions}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <SelectField
                  style={{ width: 120 }}
                  label={t('accordion.iconAlign')}
                  name={`${focusIdx}.attributes.icon-align`}
                  options={alignOptions}
                />
              </Grid.Col>
            </Grid.Row>

            <TextField label={t('accordion.border')} name={`${focusIdx}.attributes.border`} />
          </Space>
        </Collapse.Item>
        <Collapse.Item name='4' header={t('accordion.extra')}>
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
