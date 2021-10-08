/* eslint-disable react/jsx-wrap-multilines */
import { Stack } from '@/components/UI/Stack';
import { Card, Tabs } from 'antd';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './index.module.scss';
import { Help } from '@/components/UI/Help';
import { createPortal } from 'react-dom';
import { IconFont } from '@/components/IconFont';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import {
  BlockMarketCategory,
  BlockMarketManager,
} from '@/utils/BlockMarketManager';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';

export const BlocksPanel: React.FC = (props) => {
  const { isDragging } = useHoverIdx();
  const [visible, setVisible] = useState(false);
  const [ele, setEle] = useState<HTMLElement | null>(null);
  const { extraBlocks } = useContext(EditorPropsContext);

  useEffect(() => {
    if (!isDragging) {
      setVisible(false);
    }
  }, [isDragging]);

  const toggleVisible = useCallback(() => {
    setVisible((v) => !v);
  }, []);

  const categories = useMemo(() => {
    return [
      ...BlockMarketManager.getCategories(),
      ...(extraBlocks || []),
    ].filter((item) => item.blocks.length > 0);
  }, [extraBlocks]);

  return useMemo(
    () => (
      <>
        <div ref={setEle} style={{ position: 'relative' }}>
          <div onClick={toggleVisible}>{props.children}</div>

          {ele &&
            visible &&
            createPortal(
              <div
                style={{
                  pointerEvents: isDragging ? 'none' : undefined,
                  position: 'absolute',
                  width: isDragging ? 0 : 650,
                  zIndex: 200,
                  top: -16,
                  left: 47,
                  transition: 'width .5s',
                  overflow: 'hidden',
                  boxShadow:
                    '0 1px 5px 0 rgb(0 0 0 / 12%), 0 2px 10px 0 rgb(0 0 0 / 8%), 0 1px 20px 0 rgb(0 0 0 / 8%)',
                }}
              >
                <Card
                  bodyStyle={{ padding: 0 }}
                  title='Drag block'
                  extra={
                    <div className={styles.closeBtn}>
                      <IconFont iconName='icon-close' onClick={toggleVisible} />
                    </div>
                  }
                >
                  <Tabs
                    style={{ maxHeight: '100%' }}
                    tabBarStyle={{ padding: 0 }}
                    tabPosition='left'
                  >
                    {categories.map((category) => (
                      <Tabs.TabPane
                        style={{ padding: 0 }}
                        key={category.title}
                        tab={category.title}
                      >
                        <BlockPanelItem category={category} />
                      </Tabs.TabPane>
                    ))}
                  </Tabs>
                </Card>
              </div>,
              ele
            )}
        </div>
      </>
    ),
    [categories, ele, isDragging, props.children, toggleVisible, visible]
  );
};

const BlockPanelItem: React.FC<{
  category: BlockMarketCategory;
}> = React.memo((props) => {
  return (
    <Tabs tabBarStyle={{ padding: '20px 0' }} tabPosition='left'>
      {props.category.blocks.map((block, index) => {
        return (
          <Tabs.TabPane
            style={{ padding: 0 }}
            key={block.title}
            tab={
              <Stack alignment='center' spacing='extraTight'>
                <div className={styles.blockItem}>{block.title}</div>
                {block.description && <Help title={block.description} />}
              </Stack>
            }
          >
            <div
              style={{
                maxHeight: 600,
                overflow: 'scroll',
                paddingRight: 10,
                overflowX: 'hidden',
                padding: '24px 48px 24px 24px',
              }}
            >
              {block.ExampleComponent && <block.ExampleComponent />}
            </div>
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
});
