/* eslint-disable react/jsx-wrap-multilines */
import { BlocksMap } from '@/components/core/blocks';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BasicType, BlockType } from '@/constants';
import { IBlock } from '@/typings';
import {
  DesktopOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Layout, Tabs, Popover } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { presetTemplate } from './presetTemplate';
import styles from './index.module.scss';

const contentBlocks = [
  BasicType.TEXT,
  BasicType.IMAGE,
  BasicType.BUTTON,
  BasicType.HERO,
  BasicType.SPACER,
  BasicType.DIVIDER,
  BasicType.ACCORDION,
  BasicType.CAROUSEL,
  BasicType.NAVBAR,
  BasicType.SOCIAL,
];

const layoutBlocks = [
  BasicType.WRAPPER,
  BasicType.SECTION,
  BasicType.GROUP,
  BasicType.COLUMN,
];

export const BlocksPanel: React.FC = (props) => {
  return (
    <Popover
      trigger='click'
      placement='rightBottom'
      overlayClassName={styles.popover}
      content={
        <Card bodyStyle={{ padding: 0 }} title='drag block'>
          <Tabs
            style={{ maxHeight: '100%' }}
            tabBarStyle={{ padding: 0 }}
            tabPosition='left'
          >
            <Tabs.TabPane style={{ padding: 0 }} key='Layout' tab='Layout'>
              <BlockPanelItem blockTypes={contentBlocks} />
            </Tabs.TabPane>
            <Tabs.TabPane style={{ padding: 0 }} key='content' tab='content'>
              <BlockPanelItem blockTypes={layoutBlocks} />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      }
    >
      {props.children}
    </Popover>
  );
};

const BlockPanelItem: React.FC<{
  blockTypes: Array<BlockType>;
}> = (props) => {
  return (
    <Tabs tabPosition='left'>
      {props.blockTypes.map((blockType, index) => {
        const block = BlocksMap.findBlockByType(blockType);
        return (
          <Tabs.TabPane
            key={block.type}
            tab={<div className={styles.blockItem}>{block.name}</div>}
          >
            <div
              style={{
                width: 250,
                maxHeight: 'calc(100vh - 180px)',
                overflow: 'auto',
                paddingRight: 10,
                overflowX: 'hidden',
              }}
            >
              <BlockItem block={block} />
            </div>
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

const BlockItem: React.FC<{
  block: IBlock;
}> = (props) => {
  const BlockComponent = presetTemplate[props.block.type];

  if (BlockComponent) {
    return <BlockComponent />;
  }
  return (
    <Stack vertical>
      <TextStyle>{props.block.name}</TextStyle>
    </Stack>
  );
};
