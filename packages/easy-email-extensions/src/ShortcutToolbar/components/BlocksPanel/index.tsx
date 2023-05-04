import { Card, Tabs } from '@arco-design/web-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { createPortal } from 'react-dom';
import { IconFont, Stack, useHoverIdx } from 'easy-email-editor';
import { BlockMarketCategory, BlockMarketManager } from '../../utils/BlockMarketManager';
import { defaultCategories } from './presetTemplate';
import { Help } from '@extensions/AttributePanel/components/UI/Help';

BlockMarketManager.addCategories(defaultCategories);

export const BlocksPanel: React.FC<{
  children: React.ReactNode | React.ReactElement;
}> = props => {
  const { isDragging } = useHoverIdx();
  const [visible, setVisible] = useState(false);
  const [ele, setEle] = useState<HTMLElement | null>(null);
  const [categories, setCategories] = useState<BlockMarketCategory[]>(
    BlockMarketManager.getCategories(),
  );

  useEffect(() => {
    if (!isDragging) {
      setVisible(false);
    }
  }, [isDragging]);

  useEffect(() => {
    const onChange = (c: BlockMarketCategory[]) => {
      setCategories(c);
    };
    BlockMarketManager.subscribe(onChange);
    return () => {
      BlockMarketManager.subscribe(onChange);
    };
  }, []);

  const toggleVisible = useCallback(() => {
    setVisible(v => !v);
  }, []);

  const filterCategories = useMemo(() => {
    return categories.filter(item => item.blocks.length > 0);
  }, [categories]);

  return useMemo(
    () => (
      <div
        ref={setEle}
        style={{ position: 'relative' }}
      >
        <div onClick={toggleVisible}>{props.children}</div>

        <>
          {ele &&
            visible &&
            createPortal(
              <div
                className={styles.BlocksPanel}
                style={{
                  pointerEvents: isDragging ? 'none' : undefined,
                  position: 'fixed',
                  width: isDragging ? 0 : 650,
                  backgroundColor: 'var(--color-bg-2)',
                  zIndex: 200,
                  left: 60,
                  maxHeight: '85vh',

                  transition: 'width .5s',
                  boxShadow:
                    '0 1px 5px 0 rgb(0 0 0 / 12%), 0 2px 10px 0 rgb(0 0 0 / 8%), 0 1px 20px 0 rgb(0 0 0 / 8%)',
                }}
              >
                <Card
                  bodyStyle={{ padding: 0 }}
                  title='Drag block'
                  extra={
                    <div className={styles.closeBtn}>
                      <IconFont
                        iconName='icon-close'
                        onClick={toggleVisible}
                      />
                    </div>
                  }
                >
                  <Tabs
                    tabPosition='left'
                    size='large'
                  >
                    {filterCategories.map((category, index) => (
                      <Tabs.TabPane
                        style={{
                          padding: 0,
                          overflow: 'auto',
                          height: 500,
                        }}
                        key={category.title}
                        title={
                          <div
                            style={{
                              paddingTop: index === 0 ? 5 : undefined,
                              paddingBottom: 10,
                            }}
                          >
                            {category.title}
                          </div>
                        }
                      >
                        <BlockPanelItem category={category} />
                      </Tabs.TabPane>
                    ))}
                  </Tabs>
                </Card>
              </div>,
              ele,
            )}
        </>
      </div>
    ),
    [filterCategories, ele, isDragging, props.children, toggleVisible, visible],
  );
};

const BlockPanelItem: React.FC<{
  category: BlockMarketCategory;
}> = React.memo(props => {
  return (
    <Tabs tabPosition='left'>
      {props.category.blocks.map((block, index) => {
        return (
          <Tabs.TabPane
            style={{ padding: 0, height: 500 }}
            key={block.title}
            title={
              <Stack
                alignment='center'
                spacing='extraTight'
              >
                <div className={styles.blockItem}>{block.title}</div>
                {block.description && <Help title={block.description} />}
              </Stack>
            }
          >
            <div
              className='small-scrollbar'
              style={{
                maxHeight: '100%',
                overflow: 'auto',
                paddingRight: 10,
                overflowX: 'hidden',
                padding: '24px 48px 24px 24px',
              }}
            >
              {block.component && <block.component />}
            </div>
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
});
