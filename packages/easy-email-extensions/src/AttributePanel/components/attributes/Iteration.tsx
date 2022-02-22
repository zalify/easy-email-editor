import { useBlock } from '@';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { Collapse, Grid, Switch } from '@arco-design/web-react';
import { AdvancedBlock } from '@core/blocks/advanced/generateAdvancedContentBlock';
import { TextField } from '@extensions/components/Form';
import React, { useCallback } from 'react';

export function Iteration() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change } = useBlock();

  const value = focusBlock?.data.value as AdvancedBlock['data']['value'];

  const onIterationToggle = useCallback(
    (enabled: boolean) => {
      if (enabled) {
        if (!value.iteration) {
          change(`${focusIdx}.data.value.iteration`, {
            enabled: true,
            dataSource: '',
            itemName: 'item',
            limit: 9999,
            mockQuantity: 1,
          });
        }
      }
      change(`${focusIdx}.data.value.iteration.enabled`, enabled);
    },
    [value]
  );

  return (
    <Collapse.Item
      destroyOnHide
      name='5'
      header='Iteration'
      extra={
        <div style={{ marginRight: 10 }}>
          <Switch
            checked={value.iteration?.enabled}
            onChange={onIterationToggle}
          />
        </div>
      }
    >
      {value.iteration?.enabled && (
        <Grid.Col span={24}>
          <div>
            <Grid.Row>
              <Grid.Col span={11}>
                <TextField
                  label='Data source'
                  name={`${focusIdx}.data.value.iteration.dataSource`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <TextField
                  label='Item name'
                  name={`${focusIdx}.data.value.iteration.itemName`}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col span={11}>
                <TextField
                  label='Limit'
                  name={`${focusIdx}.data.value.iteration.limit`}
                  quickchange
                  type='number'
                  onChangeAdapter={(v) => Number(v)}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <TextField
                  label='Mock quantity'
                  max={value.iteration?.limit}
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
