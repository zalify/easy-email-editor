import { useDeviceToolbar } from '@/hooks/useDeviceToolbar';
import { Layout, Tabs } from 'antd';
import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import root from 'react-shadow';
import { useBlock } from '@/hooks/useBlock';
import { IframeComponent } from '@/components/IframeComponent';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { ToolPanel } from './components/ToolPanel';
import { EmailContent } from './components/EmailContent';
import { PreviewEmail } from './components/PreviewEmail';

const TabPane = Tabs.TabPane;

export const EmailEditorLayout = () => {
  const [activeTab, setActiveTab] = useState('editor');

  const { width, content } = useDeviceToolbar();

  const innerContainerStyles: React.CSSProperties = {
    width,
    height: 'calc(100vh - 200px)',
    margin: '0 auto',
    backgroundColor: '#fff',
    overflow: 'auto'
  };

  const { moveByIdx } = useBlock();

  const onDragEnd = useCallback(
    (result: DropResult) => {

      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      // 编辑器内移动
      if (result.source.droppableId === 'Editor') {
        const getNodeIdx = (index: number) => {
          const ele = document.querySelector(
            `[data-rbd-draggable-id="${index}"]`
          ) as HTMLDivElement;
          return ele.getAttribute('data-node-idx');
        };

        const destinationIdx = getNodeIdx(result.destination.index);
        const sourceIdx = getNodeIdx(result.source.index);

        if (destinationIdx && sourceIdx) {
          moveByIdx(sourceIdx, destinationIdx);
        }
      }
    },
    [moveByIdx]
  );

  const smallSceen = window.innerWidth < 1920;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout>
        <div style={{ display: 'flex', width: '100vw' }}>
          <Layout.Sider theme='light' width={302}>
            <div
              id='leftSide'
              style={{
                height: '100%',
                overflow: 'overlay',
              }}
            >
              <ToolPanel />
            </div>
          </Layout.Sider>

          <Layout>
            <div id='centerEditor'>

              <div style={{ width: '100%' }}>
                {content}
                <Tabs
                  activeKey={activeTab}
                  tabBarStyle={{ paddingLeft: 20 }}
                  onChange={setActiveTab}
                >
                  <TabPane tab='Edit' key='editor'>
                    <div
                      className={styles.container}
                      style={{ paddingTop: smallSceen ? 0 : 20 }}
                    >
                      <div style={innerContainerStyles}>
                        <root.div
                          id='VisualEditorEditMode'
                          style={innerContainerStyles}
                        >
                          <EmailContent />
                        </root.div>
                      </div>

                    </div>

                  </TabPane>
                  <TabPane tab='Preview' key='preview'>
                    <div
                      className={styles.container}
                      style={{ paddingTop: smallSceen ? 0 : 20 }}
                    >
                      <div style={innerContainerStyles}>
                        <IframeComponent height="100%" width="100%" style={{ border: 'none', paddingTop: -16 }}>
                          <PreviewEmail />
                        </IframeComponent>
                      </div>

                    </div>
                  </TabPane>
                </Tabs>
              </div>

            </div>
          </Layout>

          <Layout.Sider theme='light' width={350}>
            <div
              id='rightSide'
              style={{
                height: '100%',
                overflowY: 'scroll',
              }}
            >
              <ConfigurationPanel />
            </div>
          </Layout.Sider>
        </div>
      </Layout>
    </DragDropContext>
  );
};
