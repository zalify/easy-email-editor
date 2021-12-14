import { ShortcutToolbar } from '../ShortcutToolbar';
import { Card, Layout, Tabs } from '@arco-design/web-react';
import { useEditorProps } from 'easy-email-editor';
import React from 'react';
import { SourceCodePanel } from '../SourceCodePanel';
import { AttributePanel } from '../AttributePanel';
import { BlockLayer } from '../BlockLayer';
import { InteractivePrompt } from '../InteractivePrompt';
import styles from './index.module.scss';

export const SimpleLayout: React.FC = (props) => {
  const { height: containerHeight } = useEditorProps();
  return (
    <Layout
      style={{
        display: 'flex',
        width: '100vw',
        overflow: 'hidden',
        minWidth: 1400,
      }}
    >
      <Layout.Sider
        style={{
          width: 360,
        }}
      >
        <Card bodyStyle={{ padding: 0 }} style={{ border: 'none' }}>
          <Card.Grid style={{ width: 60 }}>
            <ShortcutToolbar />
          </Card.Grid>
          <Card.Grid
            className={styles.customScrollBar}
            style={{
              width: 300,
              paddingBottom: 50,
              border: 'none',
              height: containerHeight,
              overflow: 'auto',
            }}
          >
            <Card title='Layout' style={{ border: 'none' }}>
              <BlockLayer />
            </Card>
          </Card.Grid>
        </Card>
      </Layout.Sider>

      <Layout style={{ height: containerHeight }}>{props.children}</Layout>

      <Layout.Sider style={{ height: containerHeight }} width={350}>
        <Card
          size='small'
          id='rightSide'
          style={{
            maxHeight: '100%',
            height: '100%',
            borderLeft: 'none',
          }}
          bodyStyle={{ padding: 0 }}
          className={styles.customScrollBar}
        >
          <Tabs>
            <Tabs.TabPane
              style={{ marginTop: 0 }}
              key='Configuration'
              title='Configuration'
            >
              <AttributePanel />
            </Tabs.TabPane>
            <Tabs.TabPane key='Source code' title='Source code'>
              <SourceCodePanel />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Layout.Sider>

      <InteractivePrompt />
    </Layout>
  );
};
