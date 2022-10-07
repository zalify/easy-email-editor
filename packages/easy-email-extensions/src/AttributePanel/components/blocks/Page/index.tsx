import React from 'react';
import {
  ColorPickerField,
  InputWithUnitField,
  SwitchField,
  TextAreaField,
  TextField,
} from '@extensions/components/Form';
import { Help } from '@extensions/AttributePanel/components/UI/Help';
import { AddFont } from '@extensions/components/Form/AddFont';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack, TextStyle, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { FontFamily } from '../../attributes/FontFamily';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Page() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  if (!focusIdx) return null;
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Stack.Item fill>
        <Collapse defaultActiveKey={['0', '1']}>
          <Collapse.Item name='0' header={t('page.emailSettings')}>
            <Space direction='vertical'>
              <TextField label={t('page.subject')} name={'subject'} inline />
              <TextField label={t('page.subTitle')} name={'subTitle'} inline />
              <InputWithUnitField
                label={t('page.width')}
                name={`${focusIdx}.attributes.width`}
                inline
              />
              <InputWithUnitField
                label={t('page.breakpoint')}
                helpText={t('page.breakpointHelper')}
                name={`${focusIdx}.data.value.breakpoint`}
                inline
              />
            </Space>
          </Collapse.Item>
          <Collapse.Item name='1' header={t('page.themeSettings')}>
            <Stack vertical spacing='tight'>
              <Grid.Row>
                <Grid.Col span={11}>
                  <FontFamily name={`${focusIdx}.data.value.font-family`} />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <InputWithUnitField
                    label={t('page.fontSize')}
                    name={`${focusIdx}.data.value.font-size`}
                  />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <InputWithUnitField
                    label={t('page.lineHeight')}
                    unitOptions='percent'
                    name={`${focusIdx}.data.value.line-height`}
                  />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <InputWithUnitField
                    label={t('page.fontWeight')}
                    unitOptions='percent'
                    name={`${focusIdx}.data.value.font-weight`}
                  />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <ColorPickerField
                    label={t('page.extColor')}
                    name={`${focusIdx}.data.value.text-color`}
                  />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <ColorPickerField
                    label={t('page.background')}
                    name={`${focusIdx}.attributes.background-color`}
                  />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <ColorPickerField
                  label={t('page.contentBackground')}
                  name={`${focusIdx}.data.value.content-background-color`}
                />

              </Grid.Row>

              <TextAreaField
                autoSize
                label={t('page.userStyle')}
                name={`${focusIdx}.data.value.user-style.content`}
              />
              <Stack.Item />
              <Stack.Item />
              <AddFont />
              <Stack.Item />
              <Stack.Item />
            </Stack>
          </Collapse.Item>
        </Collapse>
      </Stack.Item>
    </AttributesPanelWrapper>
  );
}
