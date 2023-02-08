import { useBlock, useFocusIdx } from 'easy-email-editor';
import { AdvancedBlock, OperatorSymbol, AdvancedType, Operator, ICondition, IConditionGroup } from 'easy-email-core';
import { Collapse, Grid, Switch, Button, Space, List, Message } from '@arco-design/web-react';
import { SelectField, TextField } from '@extensions/components/Form';
import React, { useCallback } from 'react';
import { cloneDeep, get, upperFirst } from 'lodash';
import { IconDelete, IconPlus } from '@arco-design/web-react/icon';
import { useField } from 'react-final-form';

export function Condition() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change, values } = useBlock();
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
            groups: [
              {
                symbol: OperatorSymbol.AND,
                groups: [
                  {
                    left: '',
                    operator: Operator.TRUTHY,
                    right: ''
                  }
                ],
              }
            ] as unknown[],
          } as ICondition);
        }
      }
      change(`${focusIdx}.data.value.condition.enabled`, enabled);
    },
    [change, condition, focusIdx]
  );

  const onAddCondition = useCallback((path: string) => {
    const groups = get(values, path) as IConditionGroup[];

    groups.push({
      symbol: OperatorSymbol.AND,
      groups: [
        {
          left: '',
          operator: Operator.TRUTHY,
          right: ''
        }
      ],
    });
    change(path, [...groups]);
  }, [change, values]);

  const onAddSubCondition = useCallback((path: string) => {
    const groups = get(values, path) as IConditionGroup['groups'];

    groups.push({
      left: '',
      operator: Operator.TRUTHY,
      right: ''

    });
    change(path, [...groups]);
  }, [change, values]);

  // content.children.[0].children.[0].data.value.condition.groups.1.groups
  const onDelete = useCallback((path: string, gIndex: number, ggIndex: number) => {
    if (!condition) return;
    const subPath = `${path}.${gIndex}.groups`;
    const groups = cloneDeep(get(values, path)) as any[];
    const subGroups = cloneDeep(get(values, subPath)) as any[];

    subGroups.splice(ggIndex, 1);
    if (subGroups.length === 0) {
      if (groups.length === 1) {
        Message.warning(t('At least one condition'));
        return;
      }
      // remove empty array
      groups.splice(gIndex, 1);
      change(path, [...groups]);
    } else {
      change(subPath, [...subGroups]);
    }

  }, [change, condition, values]);

  if (
    !focusBlock?.type ||
    !Object.values(AdvancedType).includes(focusBlock?.type as any)
  ) {
    return null;
  }

  const isEmpty = !condition?.groups.length;

  return (
    <Collapse.Item
      contentStyle={{
        paddingLeft: 10
      }}
      className='condition'
      destroyOnHide
      name='Condition'
      header={t('Condition')}
      extra={(
        <div style={{ marginRight: 10 }}>
          <Switch checked={condition?.enabled} onChange={onConditionToggle} />
        </div>
      )}
    >

      {condition?.enabled && (
        <Space direction='vertical' size='large'>

          <List
            header={(
              <Grid.Row justify='space-between'>
                <Grid.Col span={16}>
                  {condition.groups.length > 1 && (
                    <SelectField inline name={`${focusIdx}.data.value.condition.symbol`}
                      label={t('Symbol')}
                      options={[
                        {
                          label: t('And'),
                          value: OperatorSymbol.AND
                        },
                        {
                          label: t('Or'),
                          value: OperatorSymbol.OR
                        },
                      ]}
                    />
                  )}
                </Grid.Col>
                <Button onClick={() => onAddCondition(`${focusIdx}.data.value.condition.groups`)} size='small' icon={<IconPlus />} />
              </Grid.Row>
            )}
            dataSource={condition.groups}
            render={
              (group, gIndex) => {
                return (
                  <List.Item key={gIndex}>
                    <div>
                      <Grid.Row justify='space-between'>
                        <Grid.Col span={16}>
                          {
                            group.groups.length > 1 && (
                              <SelectField inline name={`${focusIdx}.data.value.condition.symbol`}
                                label={t('Symbol')}
                                options={[
                                  {
                                    label: t('And'),
                                    value: OperatorSymbol.AND
                                  },
                                  {
                                    label: t('Or'),
                                    value: OperatorSymbol.OR
                                  },
                                ]}
                              />
                            )
                          }
                        </Grid.Col>
                        <Button size='small' icon={<IconPlus />} onClick={() => onAddSubCondition(`${focusIdx}.data.value.condition.groups.${gIndex}.groups`)} />
                      </Grid.Row>
                      {
                        group.groups.map((item, ggIndex) => (
                          <ConditionItem
                            onDelete={onDelete}
                            path={`${focusIdx}.data.value.condition.groups`}
                            gIndex={gIndex}
                            ggIndex={ggIndex}
                            key={ggIndex}
                          />
                        ))
                      }

                    </div>
                  </List.Item>
                );
              }
            }
          />

        </Space>
      )}
    </Collapse.Item>
  );
}

const options = Object.values(Operator).map(item => ({ label: upperFirst(item), value: item }));

function ConditionItem({ path, onDelete, gIndex, ggIndex }: { path: string; gIndex: number; ggIndex: number; onDelete: (path: string, gIndex: number, ggIndex: number,) => void; }) {

  const name = `${path}.${gIndex}.groups.${ggIndex}`;
  const { input: { value } } = useField(name);

  const hideRight = value.operator === Operator.TRUTHY || value.operator === Operator.FALSY;

  return (
    <Grid.Row align='end'>
      <Grid.Col span={7}> <TextField label={t('Variable path')} name={`${name}.left`} /></Grid.Col>
      <Grid.Col span={7}> <SelectField label={t('Operator')} name={`${name}.operator`} options={options} /></Grid.Col>
      <Grid.Col span={7}> {!hideRight && <TextField label="Right" name={`${name}.right`} />}</Grid.Col>
      <Grid.Col span={3}>
        <Button onClick={() => onDelete(path, gIndex, ggIndex)} icon={<IconDelete />} />
      </Grid.Col>

    </Grid.Row>
  );
}