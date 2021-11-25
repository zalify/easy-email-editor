import { ShortcutToolbar } from '../ShortcutToolbar';
import { Card, Layout, Tabs } from 'antd';
import { useEditorProps } from 'easy-email-editor';
import React from 'react';
import { SourceCodePanel } from '../SourceCodePanel';
import { AttributePanel } from '../AttributePanel';
import { BlockLayer } from '../BlockLayer';
import { InteractivePrompt } from '../InteractivePrompt';
import styles from './index.module.scss';

const { TabPane } = Tabs;

export const SimpleLayout: React.FC = (props) => {
  const { height: containerHeight } = useEditorProps();
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          width: '100vw',
          overflow: 'hidden',
          minWidth: 1400,
        }}
      >
        <Layout.Sider
          theme='light'
          width={60}
          style={{ border: '1px solid #f0f0f0' }}
        >
          <ShortcutToolbar />
        </Layout.Sider>
        <Layout.Sider
          style={{
            borderLeft: 'none',
            height: containerHeight,
            overflow: 'auto',
          }}
          className={styles.customScrollBar}
          theme='light'
          width={300}
        >
          <Card
            bodyStyle={{ padding: 0, paddingBottom: 50 }}
            style={{ borderBottom: 'none' }}
          >
            <Tabs
              tabBarStyle={{
                paddingLeft: 20,
                marginBottom: 0,
                backgroundColor: '#fff',
              }}
              style={{ borderLeft: 'none' }}
              defaultActiveKey='Layout'
            >
              <TabPane style={{ paddingTop: 10 }} key='Layout' tab='Layout'>
                <BlockLayer />
              </TabPane>
            </Tabs>
          </Card>
        </Layout.Sider>

        <Layout style={{ height: containerHeight }}>{props.children}</Layout>

        <Layout.Sider
          style={{ height: containerHeight }}
          theme='light'
          width={350}
        >
          <Card
            size='small'
            id='rightSide'
            style={{
              maxHeight: '100%',
              height: '100%',
            }}
            bodyStyle={{ padding: 0 }}
            className={styles.customScrollBar}
          >
            <Tabs tabBarStyle={{ paddingLeft: 20, marginBottom: 0 }}>
              <Tabs.TabPane key='Configuration' tab='Configuration'>
                <AttributePanel />
              </Tabs.TabPane>
              <Tabs.TabPane key='Source code' tab='Source code'>
                <SourceCodePanel />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Layout.Sider>
      </div>
      <InteractivePrompt />
    </Layout>
  );
};
