/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext, useState } from 'react';
import styles from './index.module.scss';
import { Button, Card, Collapse, Empty } from 'antd';
import { BlockIcon } from './components/BlockIcon';
import { ColumnBlockIconPanel } from './components/ColumnBlockIcon';
import { Stack } from '@/components/UI/Stack';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { LayoutBlockIcon } from './components/LayoutBlockIcon';
import { BlockMarketManager, CategoryName } from '@/utils/BlockMarketManager';
import { getIconNameByBlockType } from '@/utils/getIconNameByBlockType';
import { IconFont } from '@/components/IconFont';

const { Panel } = Collapse;

const layoutCategory = BlockMarketManager.getCategory(CategoryName.LAYOUT);
const contentCategory = BlockMarketManager.getCategory(CategoryName.CONTENT);

export const ComponentsPanel = React.memo(function () {
  const [visible, setVisible] = useState(false);
  const { extraBlocks = [] } = useContext(EditorPropsContext);

  const onToggleMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible((v) => !v);
  };

  return (
    <div className={styles.container}>
      <Collapse
        className={styles.collapse}
        defaultActiveKey={['1', '2', '3', '4', '5']}
      >
        <Panel
          header="Layout"
          key="2"
          extra={
            <Button type="link" onClick={onToggleMore}>
              {visible ? ' Show less' : ' Show more'}
            </Button>
          }
        >
          <Card style={{ padding: '10px' }}>
            {
              layoutCategory?.blocks.map(item => (
                <Card.Grid className={styles.layoutGrid} key={item.type}>
                  <LayoutBlockIcon
                    text={item.title}
                    helpText={item.description}
                    type={item.type}
                    icon={<IconFont iconName={getIconNameByBlockType(item.type)} />}
                  />
                </Card.Grid>
              ))
            }
          </Card>
          <div
            style={{
              maxHeight: visible ? 999 : 0,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '10px 20px' }}>
              <ColumnBlockIconPanel />
            </div>
          </div>
        </Panel>
        <Panel header="Content" key="1">
          <Card style={{ padding: '10px' }}>
            {
              contentCategory?.blocks.map(item => (
                <Card.Grid className={styles.contentGrid} key={item.type}>
                  <BlockIcon
                    text={item.title}
                    helpText={item.description}
                    type={item.type}
                    icon={<IconFont iconName={getIconNameByBlockType(item.type)} />}
                  />
                </Card.Grid>
              ))
            }
          </Card>
        </Panel>

        {extraBlocks.map((item, index) => (

          <Panel header={item.title} key={`${index + 3}`}>
            <Card style={{ padding: '10px' }}>
              {
                item.blocks.map(block => (
                  <Card.Grid className={styles.contentGrid} key={block.type}>
                    <BlockIcon
                      {...block}
                      payload={block.payload}
                      text={block.title}
                      type={block.type}
                      thumbnail={block.thumbnail}
                    />
                  </Card.Grid>
                ))
              }
              {item.blocks.length === 0 && <Empty />}
            </Card>

          </Panel>
        ))}
      </Collapse>
    </div>
  );
});
