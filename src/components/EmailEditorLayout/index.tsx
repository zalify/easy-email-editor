import {
  DesktopOutlined,
  TabletOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Button, Layout, Tabs } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';
import root from 'react-shadow';
import { IframeComponent } from '@/components/IframeComponent';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { ToolPanel } from './components/ToolPanel';
import { EmailContent } from './components/EmailContent';
import { PreviewEmail } from './components/PreviewEmail';
import { Stack } from '../Stack';
import { TextStyle } from '../TextStyle';

const TabPane = Tabs.TabPane;

export const EmailEditorLayout = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState('editor');

  const containerHeight = useMemo(() => window.innerHeight - (ref?.getBoundingClientRect().top || 0), [ref]);

  const innerContainerStyles: React.CSSProperties = {
    height: containerHeight - 120,
    width: 600,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    backgroundColor: '#fff'
  };

  return (

    <Layout>
      <div ref={setRef} style={{ display: 'flex', width: '100vw', height: containerHeight, overflow: 'hidden' }}>
        <Layout.Sider theme='light' width={302}>
          <div
            id='leftSide'
            style={{
              maxHeight: '100%',
              overflow: 'overlay',
            }}
          >
            <ToolPanel />
          </div>
        </Layout.Sider>

        <Layout>
          <div id='centerEditor'>

            <Tabs
              activeKey={activeTab}
              tabBarStyle={{ paddingLeft: 20, backgroundColor: '#fff' }}
              onChange={setActiveTab}
            >
              <TabPane tab={<Stack spacing="none"><EditOutlined /><TextStyle>Edit</TextStyle></Stack>} key='editor' style={{ backgroundColor: 'transparent' }}>
                <root.div
                  id='VisualEditorEditMode'

                  style={innerContainerStyles}
                >
                  <EmailContent />
                </root.div>
              </TabPane>
              <TabPane tab={<Stack spacing="none"><DesktopOutlined /><TextStyle>Preview</TextStyle></Stack>} key='laptopIcon' style={{ backgroundColor: 'transparent' }}>
                <div style={innerContainerStyles}>
                  <IframeComponent height="100%" width="100%" style={{ border: 'none', paddingTop: -16 }}>
                    <PreviewEmail />
                  </IframeComponent>
                </div>
              </TabPane>
              <TabPane tab={<Stack spacing="none"><TabletOutlined /><TextStyle>Preview</TextStyle></Stack>} key='mobileIcon' style={{ backgroundColor: 'transparent' }}>
                <div style={{ ...innerContainerStyles, }}>
                  <IframeComponent height="100%" width={375} style={{ border: 'none', paddingTop: -16 }}>
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
              height: '100%',
              overflowY: 'scroll',
            }}
          >
            <ConfigurationPanel />
          </div>
        </Layout.Sider>
      </div>
    </Layout>

  );
};
