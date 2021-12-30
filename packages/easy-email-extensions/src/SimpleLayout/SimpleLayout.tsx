import { ShortcutToolbar } from '../ShortcutToolbar';
import { Card, ConfigProvider, Layout, Tabs } from '@arco-design/web-react';
import { useEditorProps } from 'easy-email-editor';
import React from 'react';
import { SourceCodePanel } from '../SourceCodePanel';
import { AttributePanel } from '../AttributePanel';
import { BlockLayer } from '../BlockLayer';
import { InteractivePrompt } from '../InteractivePrompt';
import styles from './index.module.scss';
import enUS from '@arco-design/web-react/es/locale/en-US';

export const SimpleLayout: React.FC<{
  showSourceCode?: boolean;
}> = (props) => {
  const { height: containerHeight } = useEditorProps();
  const { showSourceCode = true } = props;
  return (
    <ConfigProvider locale={enUS}>
      <Layout
        className={styles.SimpleLayout}
        style={{
          display: 'flex',
          width: '100vw',
          overflow: 'hidden',
          minWidth: 1400,
        }}
      >
        <Layout.Sider
          resizeDirections={['right']}
          style={{ minWidth: 300, maxWidth: 360, width: 360, paddingRight: 0 }}
        >
          <Card bodyStyle={{ padding: 0 }} style={{ border: 'none' }}>
            <Card.Grid style={{ width: 60 }}>
              <ShortcutToolbar />
            </Card.Grid>
            <Card.Grid
              className={styles.customScrollBar}
              style={{
                flex: 1,
                paddingBottom: 50,
                border: 'none',
                height: containerHeight,
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              <Card title='Layout' style={{ border: 'none' }}>
                <BlockLayer />
              </Card>
            </Card.Grid>
          </Card>
        </Layout.Sider>

        <Layout style={{ height: containerHeight }}>{props.children}</Layout>

        <Layout.Sider
          style={{
            height: containerHeight,
            minWidth: 300,
            maxWidth: 350,
            width: 350,
          }}
        >
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
              {showSourceCode && (
                <Tabs.TabPane key='Source code' title='Source code'>
                  <SourceCodePanel />
                </Tabs.TabPane>
              )}
            </Tabs>
          </Card>
        </Layout.Sider>

        <InteractivePrompt />
      </Layout>
    </ConfigProvider>
  );
};
