import {
  DesktopOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Layout, Tabs, Popover } from 'antd';
import React, { useMemo } from 'react';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { Stack } from '../UI/Stack';
import { TextStyle } from '../UI/TextStyle';
import { ToolsPanel } from './components/ToolsPanel';
import './index.scss';
import styles from './index.module.scss';
import { useEditorContext } from '@/hooks/useEditorContext';
import { createPortal } from 'react-dom';
import { FIXED_CONTAINER_ID } from '@/constants';
import { useActiveTab } from '@/hooks/useActiveTab';
import { ActiveTabKeys } from '../Provider/BlocksProvider';
import { DesktopEmailPreview } from './components/DesktopEmailPreview';
import { MobileEmailPreview } from './components/MobileEmailPreview';
import { EditEmailPreview } from './components/EditEmailPreview';
import { BlockLayerManager } from './components/ConfigurationPanel/components/BlockLayerManager';
import { IconFont } from '../IconFont';
import { BlocksPanel } from './components/BlocksPanel';
import { ComponentsPanel } from './components/ComponentsPanel';
import { ShortcutToolbar } from './components/ShortcutToolbar';
export interface EmailEditorProps {
  height: string | number;
}

//
(window as any).global = window;

const TabPane = Tabs.TabPane;

export const EmailEditor = (props: EmailEditorProps) => {
  const { height: containerHeight } = props;
  const { activeTab, setActiveTab } = useActiveTab();
  const { pageData } = useEditorContext();

  const backgroundColor = pageData.attributes['background-color'];

  const fixedContainer = useMemo(() => {
    return createPortal(<div id={FIXED_CONTAINER_ID} />, document.body);
  }, []);

  return useMemo(
    () => (
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
            <ShortcutToolbar height={containerHeight} />
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
                  <BlockLayerManager />
                </TabPane>
              </Tabs>
            </Card>
          </Layout.Sider>

          <Layout style={{ height: containerHeight }}>
            <Card
              bodyStyle={{
                backgroundColor: backgroundColor,

                padding: 0,
              }}
            >
              <div
                id='centerEditor'
                style={{
                  backgroundColor: backgroundColor,
                  height: containerHeight,
                  paddingBottom: 40,
                }}
              >
                <Tabs
                  activeKey={activeTab}
                  tabBarStyle={{
                    paddingLeft: 20,
                    marginBottom: 0,
                    backgroundColor: '#fff',
                  }}
                  onChange={setActiveTab as any}
                  tabBarExtraContent={<ToolsPanel />}
                >
                  <TabPane
                    tab={
                      <Stack spacing='none'>
                        <EditOutlined />
                        <TextStyle>Edit</TextStyle>
                      </Stack>
                    }
                    key={ActiveTabKeys.EDIT}
                  >
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      <EditEmailPreview />
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <Stack spacing='none'>
                        <DesktopOutlined />
                        <TextStyle>Preview</TextStyle>
                      </Stack>
                    }
                    key={ActiveTabKeys.PC}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <DesktopEmailPreview />
                  </TabPane>
                  <TabPane
                    tab={
                      <Stack spacing='none'>
                        <TabletOutlined />
                        <TextStyle>Preview</TextStyle>
                      </Stack>
                    }
                    key={ActiveTabKeys.MOBILE}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <MobileEmailPreview />
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Layout>

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
              <ConfigurationPanel />
            </Card>
          </Layout.Sider>
        </div>

        {fixedContainer}
      </Layout>
    ),
    [activeTab, backgroundColor, containerHeight, fixedContainer, setActiveTab]
  );
};
