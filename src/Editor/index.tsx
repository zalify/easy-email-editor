import { useDeviceToolbar } from '@/hooks/useDeviceToolbar';
import { Tabs } from 'antd';
import React, { useCallback, useState } from 'react';
import { EditorContent } from './components/EditorContent';
import styles from './index.module.scss';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import root from 'react-shadow';
import { useBlock } from '@/hooks/useBlock';
import { PreviewContent } from './components/PreviewContent';
import { IframeComponent } from '@/components/IframeComponent';

const TabPane = Tabs.TabPane;

export const Editor = () => {
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
          )?.firstChild as HTMLDivElement;
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
      <div style={{ width: '100%' }}>
        {content}
        <Tabs
          activeKey={activeTab}
          tabBarStyle={{ paddingLeft: 20 }}
          onChange={setActiveTab}
        >
          <TabPane tab='编辑' key='editor'>
            <div style={{ position: 'relative' }}>
              <Droppable droppableId='Editor'>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div
                      className={styles.container}
                      style={{ paddingTop: smallSceen ? 0 : 20 }}
                    >
                      <root.div
                        id='VisualEditorEditMode'
                        style={innerContainerStyles}
                      >
                        <EditorContent />
                        <style type="text/css">
                          {
                            `
                            .block-selected {
                              outline-offset: -2px;
                              outline: 2px solid #3b97e3 !important;
                            }

                            .block-hover {
                              outline-offset: -1px;
                              outline: 1px solid #3b97e3;
                            }

                            .block-dragover {
                              outline-offset: -2px;
                              outline: 2px solid #D0021B !important;
                            }

                            .block-tangent {
                              outline-offset: -2px;
                              outline: 2px solid #F5A623 !important;
                            }

                            .email-block {
                              outline: 1px dashed rgba(170,170,170,0.7);
                              outline-offset: -2px;
                          }



                          `
                          }
                        </style>
                      </root.div>
                    </div>
                    <div style={{ opacity: 0 }}>{provided.placeholder}</div>
                  </div>
                )}
              </Droppable>
            </div>
          </TabPane>
          <TabPane tab='预览' key='preview'>
            <div
              className={styles.container}
              style={{ paddingTop: smallSceen ? 0 : 20 }}
            >
              <div style={innerContainerStyles}>
                <IframeComponent height="100%" width="100%" style={{ border: 'none', paddingTop: -16 }}>
                  <PreviewContent />
                </IframeComponent>
              </div>

            </div>
          </TabPane>
        </Tabs>
      </div>
    </DragDropContext>
  );
};
