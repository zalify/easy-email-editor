import {
  DesktopOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import root from 'react-shadow';
import { IframeComponent } from '@/components/IframeComponent';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { ComponentsPanel } from './components/ComponentsPanel';
import { EmailContent } from './components/EmailContent';
import { PreviewEmail } from './components/PreviewEmail';
import { Stack } from '../Stack';
import { TextStyle } from '../TextStyle';
import { ToolsPanel } from './components/ToolsPanel';
import styles from './index.module.scss';
import { useEditorContext } from '@/hooks/useEditorContext';

const TabPane = Tabs.TabPane;

export const EmailEditorLayout = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState('editor');
  const [containerHeight, setContainerHeight] = useState(0);
  const { pageData } = useEditorContext();

  useEffect(() => {
    const getHeight = () => window.innerHeight - (ref?.getBoundingClientRect().top || 0);
    setContainerHeight(getHeight());
    window.addEventListener('resize', getHeight);

    return () => {
      window.removeEventListener('resize', getHeight);
    };
  }, [ref]);

  const pageMaxWidth = pageData.attributes.width || '600px';
  const pageMinWidth = pageData.data.value.breakpoint || '480px';

  return (
    <Layout>
      <div
        ref={setRef}
        style={{
          display: 'flex',
          width: '100vw',

          overflow: 'hidden',
        }}
      >
        <Layout.Sider theme='light' width={340}>
          <div
            id='leftSide'
            style={{
              maxHeight: '100%',
              height: containerHeight
            }}
            className={styles.customScrollBar}
          >
            <ComponentsPanel />
          </div>
        </Layout.Sider>

        <Layout>
          <div id='centerEditor'>
            <Tabs
              activeKey={activeTab}
              tabBarStyle={{ paddingLeft: 20, marginBottom: 0, }}
              onChange={setActiveTab}
              tabBarExtraContent={<ToolsPanel />}
            >
              <TabPane
                tab={(
                  <Stack spacing='none'>
                    <EditOutlined />
                    <TextStyle>Edit</TextStyle>
                  </Stack>
                )}
                key='editor'
                style={{
                  backgroundColor: 'transparent',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <root.div
                  id='VisualEditorEditMode'
                  style={{
                    width: pageMaxWidth,
                    height: innerHeight - 160,
                    padding: 40,
                    paddingBottom: 0,
                    margin: 'auto'
                  }}
                >
                  <EmailContent />
                </root.div>
              </TabPane>
              <TabPane
                tab={(
                  <Stack spacing='none'>
                    <DesktopOutlined />
                    <TextStyle>Preview</TextStyle>
                  </Stack>
                )}
                key='laptopIcon'
                style={{ backgroundColor: 'transparent' }}
              >
                <div
                  style={{
                    width: pageMaxWidth,
                    height: innerHeight - 160,
                    padding: 40,
                    paddingBottom: 0,
                    margin: 'auto'
                  }}
                >
                  <IframeComponent
                    height='100%'
                    width='100%'
                    style={{ border: 'none', paddingTop: -16 }}
                  >
                    <PreviewEmail />
                  </IframeComponent>
                </div>
              </TabPane>
              <TabPane
                tab={(
                  <Stack spacing='none'>
                    <TabletOutlined />
                    <TextStyle>Preview</TextStyle>
                  </Stack>
                )}
                key='mobileIcon'
                style={{ backgroundColor: 'transparent' }}
              >
                <div
                  style={{
                    width: pageMinWidth,
                    height: innerHeight - 160,
                    padding: 40,
                    paddingBottom: 0,
                    margin: 'auto'
                  }}
                >
                  <IframeComponent
                    height='100%'
                    width='100%'
                    style={{ border: 'none', paddingTop: -16 }}
                  >
                    <PreviewEmail />
                  </IframeComponent>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Layout>

        <Layout.Sider theme='light' width={350}>
          <div
            id='rightSide'
            style={{
              height: containerHeight,
              overflowY: 'scroll',
            }}
            className={styles.customScrollBar}
          >
            <ConfigurationPanel />
          </div>
        </Layout.Sider>
      </div>
    </Layout>
  );
};
