import {
  DesktopOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import React, { useState } from 'react';
import root from 'react-shadow';
import { IframeComponent } from '@/components/IframeComponent';
import { ConfigurationPanel } from '@/components/EmailEditorLayout/components/ConfigurationPanel';
import { ComponentsPanel } from './components/ComponentsPanel';
import { EmailContent } from './components/EmailContent';
import { PreviewEmail } from './components/PreviewEmail';
import { Stack } from '../Stack';
import { TextStyle } from '../TextStyle';
import { ToolsPanel } from './components/ToolsPanel';
import './index.scss';
import styles from './index.module.scss';
import { useEditorContext } from '@/hooks/useEditorContext';

const TabPane = Tabs.TabPane;

export interface EmailEditorLayoutProps {
  height: string | number;
}
export const EmailEditorLayout = (props: EmailEditorLayoutProps) => {
  const { height: containerHeight } = props;
  const [activeTab, setActiveTab] = useState('editor');
  const { pageData } = useEditorContext();

  const pageMaxWidth = pageData.attributes.width || '600px';
  const pageMinWidth = '375px';

  return (
    <Layout>
      <div
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
          <div id='centerEditor' style={{ backgroundColor: pageData.attributes['background-color'], height: containerHeight }}>
            <Tabs
              activeKey={activeTab}
              tabBarStyle={{ paddingLeft: 20, marginBottom: 0, backgroundColor: '#fff' }}
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
                  height: '100%'
                }}
              >
                <root.div
                  id='VisualEditorEditMode'
                  style={{
                    width: pageMaxWidth,
                    padding: '40px 0px',
                    margin: 'auto',
                    height: '100%'
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
                    padding: 40,
                    margin: 'auto',
                    height: '100%'
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
                    padding: 40,
                    margin: 'auto',
                    height: '100%'
                  }}
                >
                  <IframeComponent
                    height='100%'
                    width='100%'
                    style={{ paddingTop: -16 }}
                    className={styles.app}
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
              maxHeight: '100%',
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
