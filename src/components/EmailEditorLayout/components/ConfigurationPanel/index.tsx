
import { Tabs } from 'antd';
import React from 'react';
import { findBlockByType, getValueByIdx } from '../../../../utils/block';
import { useBlock } from '@/hooks/useBlock';
import { BlockLayerManager } from './components/BlockLayerManager';
import { SourceCodeManager } from './components/SourceCodeManager';
import { AttributesManager } from './components/AttributesManager';

export function ConfigurationPanel() {
  const { focusIdx, values } = useBlock();
  const value = getValueByIdx(values, focusIdx);

  const block = value && findBlockByType(value.type);

  if (!block || !value) return null;

  return (
    <Tabs tabBarStyle={{ paddingLeft: 20 }}>
      <Tabs.TabPane key='Configarution' tab='Configarution'>
        <AttributesManager />
      </Tabs.TabPane>
      <Tabs.TabPane key='Block layer' tab='Block layer'>
        <BlockLayerManager />
      </Tabs.TabPane>
      <Tabs.TabPane key='Source code' tab='Source code'>
        <SourceCodeManager />
      </Tabs.TabPane>

    </Tabs>
  );
}
