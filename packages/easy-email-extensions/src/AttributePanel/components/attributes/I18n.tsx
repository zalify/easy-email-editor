import { useBlock, useFocusIdx } from 'easy-email-editor';
import { Collapse, Grid, Switch } from '@arco-design/web-react';
import { AdvancedBlock, AdvancedType } from 'easy-email-core';
import { TextField } from '@extensions/components/Form';
import React, { useCallback } from 'react';

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
              <Grid.Col span={11}>
                <TextField
                  label='Context'
                  name={`${focusIdx}.data.value.i18n.context`}
                />
              </Grid.Col>
            </Grid.Row>
          </div>
        </Grid.Col>
      )}
    </Collapse.Item>
  );
}
