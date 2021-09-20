/* eslint-disable react/jsx-wrap-multilines */
import { BlocksMap } from '@/components/core/blocks';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BasicType, BlockType } from '@/constants';
import { IBlock } from '@/typings';
import { Card, Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { presetTemplate } from './presetTemplate';
import styles from './index.module.scss';
import { Help } from '@/components/UI/Help';
import { useHoverIdx } from 'easy-email-editor';
import { createPortal } from 'react-dom';
import { IconFont } from '@/components/IconFont';

const contentBlocks = [
  BasicType.TEXT,
  BasicType.IMAGE,
  BasicType.BUTTON,
  BasicType.HERO,
  BasicType.SPACER,
  BasicType.DIVIDER,
  BasicType.NAVBAR,
  BasicType.SOCIAL,
  BasicType.CAROUSEL,
];

const layoutBlocks = [
  BasicType.WRAPPER,
  BasicType.SECTION,
  BasicType.GROUP,
  BasicType.COLUMN,
];

export const BlocksPanel: React.FC = (props) => {
  const { isDragging } = useHoverIdx();
  const [visible, setVisible] = useState(false);
  const [ele, setEle] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isDragging) {
      setTimeout(() => {
        setVisible(false);
      }, 0);
    }
  }, [isDragging]);

  const toggleVisible = useCallback(() => {
    setVisible((v) => !v);
  }, []);

  return (
    <>
      <div ref={setEle} style={{ position: 'relative' }}>
        <div onClick={toggleVisible}>{props.children}</div>

        {ele &&
          createPortal(
            <div
              style={{
                display: visible ? undefined : 'none',
                pointerEvents: isDragging ? 'none' : undefined,
                position: 'absolute',
                width: isDragging ? 0 : 650,
                height: 600,
                zIndex: 200,
                top: -16,
                left: 47,
                transition: 'all .5s',
              }}
            >
              <Card
                bodyStyle={{ padding: 0 }}
                title='Drag block'
                extra={
                  <IconFont iconName='icon-close' onClick={toggleVisible} />
                }
              >
                <Tabs
                  style={{ maxHeight: '100%' }}
                  tabBarStyle={{ padding: 0 }}
                  tabPosition='left'
                >
                  <Tabs.TabPane
                    style={{ padding: 0 }}
                    key='Layout'
                    tab='content'
                  >
                    <BlockPanelItem blockTypes={contentBlocks} />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    style={{ padding: 0 }}
                    key='content'
                    tab='Layout'
                  >
                    <BlockPanelItem blockTypes={layoutBlocks} />
                  </Tabs.TabPane>
                </Tabs>
              </Card>
            </div>,
            ele
          )}
      </div>
    </>
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
            style={{ padding: 0 }}
            key={block.type}
            tab={
              <Stack alignment='center' spacing='extraTight'>
                <div className={styles.blockItem}>{block.name}</div>
                {block.description && <Help title={block.description} />}
              </Stack>
            }
          >
            <div
              style={{
                maxHeight: 'calc(100vh - 180px)',
                overflow: 'scroll',
                paddingRight: 10,
                overflowX: 'hidden',
                padding: '24px 48px 24px 24px',
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
