import { useBlock, useFocusIdx } from 'easy-email-editor';
import { Collapse, Grid, Switch } from '@arco-design/web-react';
import { AdvancedBlock, AdvancedType } from 'easy-email-core';
import { TextField } from '@extensions/components/Form';
import React, { useCallback } from 'react';

export function Iteration() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change } = useBlock();
  const iteration = focusBlock?.data.value?.iteration as
    | undefined
    | AdvancedBlock['data']['value']['iteration'];

  const enabled = Boolean(iteration && iteration.enabled);

  const onIterationToggle = useCallback(
    (enabled: boolean) => {
      if (enabled) {
        if (!iteration) {
          change(`${focusIdx}.data.value.iteration`, {
            enabled: true,
            dataSource: '',
            itemName: 'item',
            limit: 9999,
            mockQuantity: 1,
          } as AdvancedBlock['data']['value']['iteration']);
        }
      }
      change(`${focusIdx}.data.value.iteration.enabled`, enabled);
    },
    [change, focusIdx, iteration]
  );

  if (
    !focusBlock?.type ||
    !Object.values(AdvancedType).includes(focusBlock?.type as any)
  ) {
    return null;
  }

  return (
    <Collapse.Item
      className='iteration'
      destroyOnHide
      name='Iteration'
      header={t('Iteration')}
      extra={(
        <div style={{ marginRight: 10 }}>
          <Switch checked={iteration?.enabled} onChange={onIterationToggle} />
        </div>
      )}
    >
      {iteration?.enabled && (
        <Grid.Col span={24}>
          <div>
            <Grid.Row>
              <Grid.Col span={11}>
                <TextField
                  label={t('Data source')}
                  name={`${focusIdx}.data.value.iteration.dataSource`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <TextField
                  label={t('Item name')}
                  name={`${focusIdx}.data.value.iteration.itemName`}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col span={11}>
                <TextField
                  label={t('Limit')}
                  name={`${focusIdx}.data.value.iteration.limit`}
                  quickchange
                  type='number'
                  onChangeAdapter={(v) => Number(v)}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <TextField
                  label={t('Mock quantity')}
                  max={iteration?.limit}
                  name={`${focusIdx}.data.value.iteration.mockQuantity`}
                  type='number'
                  onChangeAdapter={(v) => Number(v)}
                  quickchange
                />
              </Grid.Col>
            </Grid.Row>
          </div>
        </Grid.Col>
      )}
    </Collapse.Item>
  );
}
