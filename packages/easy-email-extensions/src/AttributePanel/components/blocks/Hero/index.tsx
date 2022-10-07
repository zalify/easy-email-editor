import React, { useContext, useMemo } from 'react';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import {
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  TextField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Hero() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  const { t } = useTranslation();

  const options = useMemo(() => {
    return [
      {
        value: 'fluid-height',
        label: t('hero.fluidHeight'),
      },
      {
        value: 'fixed-height',
        label:  t('hero.fixedHeight')
      },
    ];
  }, [t]);

  return (
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='0' header={t('hero.dimension')}>
          <Space direction='vertical'>
            <RadioGroupField
              label={t('hero.mode')}
              name={`${focusIdx}.attributes.mode`}
              options={options}
            />
            <Grid.Row>
              <Grid.Col span={11}>
                <Width />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <Height />
              </Grid.Col>
            </Grid.Row>

            <Padding />
            <VerticalAlign />
          </Space>
        </Collapse.Item>
        <Collapse.Item name='1' header={t('hero.background')}>
          <Space direction='vertical'>
            <ImageUploaderField
              label={t('hero.src')}
              name={`${focusIdx}.attributes.background-url`}
              helpText={t('hero.srcHelper')}
              uploadHandler={onUploadImage}
            />

            <Grid.Row>
              <Grid.Col span={11}>
                <InputWithUnitField
                  label={t('hero.backgroundWidth')}
                  name={`${focusIdx}.attributes.background-width`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <InputWithUnitField
                  label={t('hero.backgroundHeight')}
                  name={`${focusIdx}.attributes.background-height`}
                />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <TextField
                  label={t('hero.backgroundPosition')}
                  name={`${focusIdx}.attributes.background-position`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <InputWithUnitField
                  label={t('hero.borderRadius')}
                  name={`${focusIdx}.attributes.border-radius`}
                  unitOptions='percent'
                />
              </Grid.Col>
              <Grid.Col span={11}>
                <BackgroundColor />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Collapse.Item>
        <Collapse.Item name='4' header={t('hero.extra')}>
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
