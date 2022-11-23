import { useBlock, useFocusIdx } from 'easy-email-editor';
import { Collapse, Grid, Switch } from '@arco-design/web-react';
import { AdvancedBlock, AdvancedType } from 'easy-email-core';
import { RadioGroupField, TextField } from '@extensions/components/Form';
import React, { useCallback } from 'react';
import { RadioGroup } from '@extensions/components/Form/RadioGroup';
import { I18nType } from 'easy-email-core';

export function I18n() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change } = useBlock();
  const i18n = focusBlock?.data.value?.i18n as
    | undefined
    | AdvancedBlock['data']['value']['i18n'];

  const enabled = Boolean(i18n && i18n.enabled);

  const onI18nToggle = useCallback(
    (enabled: boolean) => {
      if (enabled) {
        if (!i18n) {
          change(`${focusIdx}.data.value.i18n`, {
            enabled: true,
            context: '',
            type: I18nType.I18N,
          } as AdvancedBlock['data']['value']['i18n']);
        }
      }
      change(`${focusIdx}.data.value.i18n.enabled`, enabled);
    },
    [change, focusIdx, i18n],
  );

  if (
    !focusBlock?.type ||
    !Object.values(AdvancedType).includes(focusBlock?.type as any)
  ) {
    return null;
  }

  const options = [
    {
      value: I18nType.I18N,
      label: 'i18n',
    },
    {
      value: I18nType.CI18N,
      label: 'ci18n',
    },
    {
      value: I18nType.NI18N,
      label: 'ni18n',
    },
    {
      value: I18nType.CNI18N,
      label: 'cni18n',
    },
  ];

  return (
    <Collapse.Item
      className='I18N'
      destroyOnHide
      name='I18N'
      header='I18N'
      extra={
        <div style={{ marginRight: 10 }}>
          <Switch
            checked={i18n?.enabled}
            onChange={onI18nToggle}
          />
        </div>
      }
    >
      {i18n?.enabled && (
        <Grid.Col span={24}>
          <div>
            <Grid.Row>
              <Grid.Col span={22}>
                <RadioGroupField
                  label='I18n Type'
                  name={`${focusIdx}.data.value.i18n.type`}
                  options={options}
                />
              </Grid.Col>
              {(focusBlock.data.value.i18n.type === 'ci18n' ||
                focusBlock.data.value.i18n.type === 'cni18n') && (
                <Grid.Col span={11}>
                  <TextField
                    label='Context'
                    name={`${focusIdx}.data.value.i18n.context`}
                  />
                </Grid.Col>
              )}
              {(focusBlock.data.value.i18n.type === 'ni18n' ||
                focusBlock.data.value.i18n.type === 'cni18n') && (
                <Grid.Col span={24}>
                  <TextField
                    label='Singular Text'
                    name={`${focusIdx}.data.value.i18n.singularText`}
                  />
                </Grid.Col>
              )}
            </Grid.Row>
          </div>
        </Grid.Col>
      )}
    </Collapse.Item>
  );
}
