import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import { Card, message, Tabs } from 'antd';
import { Input } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { findBlockByType, getValueByIdx } from '../../utils/block';
import jsonFormat from 'json-format';
import { useBlock } from '@/hooks/useBlock';
import { transformToMjml } from '@/utils/transformToMjml';
import mjml from 'mjml-browser';
import { MjmlToJson } from '@/utils/MjmlToJson';
import { BlockLayerManager } from './components/BlockLayerManager';

export function ConfigurationPanel() {
  const { focusIdx, setValueByIdx, values } = useBlock();
  const value = getValueByIdx(values, focusIdx);

  const block = value && findBlockByType(value.type);

  const code = useMemo(() => {
    if (!value) return '';
    return jsonFormat(value, {
      type: 'space',
      size: 2
    }) || '';
    return '';
  }, [value]);

  const onChaneCode = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      try {
        const parseValue = JSON.parse(event.target.value);
        setValueByIdx(focusIdx, parseValue);
      } catch (error) {
        message.error(error.message);
      }
    },
    [focusIdx, setValueByIdx]
  );

  const onMjmlChange = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      try {
        const parseValue = MjmlToJson(mjml(event.target.value).json);
        setValueByIdx(focusIdx, parseValue);
      } catch (error) {
        message.error(error.message);
      }
    },
    [focusIdx, setValueByIdx]
  );

  if (!block || !value) return null;

  return (
    <Tabs tabBarStyle={{ paddingLeft: 20 }}>
      <Tabs.TabPane key='Config' tab='Configarution'>
        <Card
          bodyStyle={{ paddingTop: 0, backgroundColor: '#fff' }}
          title={(
            <TextStyle variation='strong' size='large'>
              {block.name} attributes
            </TextStyle>
          )}
        >
          <Stack vertical>
            {<block.Panel />}
            <Stack.Item />
            <Stack.Item />
            <Stack.Item />
            <Stack.Item />
          </Stack>
        </Card>
      </Tabs.TabPane>
      <Tabs.TabPane key='Block layer' tab='Block layer'>
        <BlockLayerManager />
      </Tabs.TabPane>
      <Tabs.TabPane key='Source' tab='Json source'>
        <Card>
          <Input.TextArea
            key={code}
            defaultValue={code}
            autoSize={{ maxRows: 25 }}
            onBlur={onChaneCode}
          />
        </Card>
      </Tabs.TabPane>
      <Tabs.TabPane key='MjML source' tab='Mjml source'>
        <Card>
          <Input.TextArea
            key={code}
            value={transformToMjml(value)}
            autoSize={{ maxRows: 25 }}
            onChange={onMjmlChange}
          />
        </Card>
      </Tabs.TabPane>

    </Tabs>
  );
}
