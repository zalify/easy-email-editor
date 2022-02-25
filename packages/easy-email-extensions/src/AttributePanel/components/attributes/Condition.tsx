import { useBlock, useFocusIdx } from 'easy-email-editor';
import { AdvancedBlock, OperatorSymbol, AdvancedType } from 'easy-email-core';
import { Collapse, Grid, Switch } from '@arco-design/web-react';
import { TextField } from '@extensions/components/Form';
import React, { useCallback } from 'react';

export function Condition() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change } = useBlock();
  const condition = focusBlock?.data.value?.condition as
    | undefined
    | AdvancedBlock['data']['value']['condition'];

  const enabled = Boolean(condition && condition.enabled);

  const onConditionToggle = useCallback(
    (enabled: boolean) => {
      if (enabled) {
        if (!condition) {
          change(`${focusIdx}.data.value.condition`, {
            enabled: true,
            symbol: OperatorSymbol.AND,
            groups: [] as unknown[],
          } as AdvancedBlock['data']['value']['condition']);
        }
      }
      change(`${focusIdx}.data.value.condition.enabled`, enabled);
    },
    [enabled, focusIdx]
  );

  if (
    !focusBlock?.type ||
    !Object.values(AdvancedType).includes(focusBlock?.type as any)
  ) {
    return null;
  }

  return (
    <Collapse.Item
      disabled={!enabled}
      className='condition'
      destroyOnHide
      name='Condition'
      header='Condition'
      extra={
        <div style={{ marginRight: 10 }}>
          <Switch checked={condition?.enabled} onChange={onConditionToggle} />
        </div>
      }
    >
      {condition?.enabled && (
        <Grid.Col span={24}>
          <div>TODO</div>
        </Grid.Col>
      )}
    </Collapse.Item>
  );
}
