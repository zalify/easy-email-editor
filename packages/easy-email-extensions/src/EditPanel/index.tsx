import { Layout, Tabs } from '@arco-design/web-react';
import { useEditorProps } from 'easy-email-editor';
import React from 'react';
import { Blocks } from './Blocks';
import { BlockLayer } from '@extensions/BlockLayer';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import styles from './index.module.scss';
import { ConfigurationDrawer } from './ConfigurationDrawer';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';

const TabPane = Tabs.TabPane;

export function EditPanel() {
  const { height } = useEditorProps();
  const { compact = true, showLayersTab = true, showBlocksTab = true } = useExtensionProps();

  return (
    <Layout.Sider
      className={styles.blocksPanel}
      style={{ paddingRight: 0, minWidth: 360 }}
      // collapsed={collapsed}
      collapsible
      trigger={null}
      breakpoint='xl'
      collapsedWidth={60}
      width={360}
    >
      <Tabs
        defaultActiveTab={ showBlocksTab ? '2' : '1' }
        style={{ width: '100%', padding: 0 }}
        renderTabHeader={(_, DefaultHeader) => (
          <div className={styles.largeTabsHeader}>
            <DefaultHeader />
          </div>
        )}
      >
        { showBlocksTab && (<TabPane
          key='2'
          title='Block'
        >
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <Blocks />
          </FullHeightOverlayScrollbars>
        </TabPane>)}

        { showLayersTab && (<TabPane
          key='1'
          title={t('Layer')}
        >
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <div style={{ padding: 20 }}>
              <BlockLayer/>
            </div>
          </FullHeightOverlayScrollbars>
        </TabPane>)}
      </Tabs>
      {!compact && (
        <ConfigurationDrawer
          height={height}
          compact={Boolean(compact)}
        />
      )}
    </Layout.Sider>
  );
}
