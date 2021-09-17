import {
  DesktopOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Layout, Tabs } from 'antd';
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
export interface EmailEditorProps {
  height: string | number;
}
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
          }}
        >
          <Layout.Sider
            style={{ height: containerHeight }}
            theme='light'
            width={280}
          >
            <Card
              size='small'
              style={{
                maxHeight: '100%',
                height: '100%',
              }}
              className={styles.customScrollBar}
              bodyStyle={{ padding: 0 }}
            >
              <div
                style={{
                  paddingLeft: 20,
                  height: 45,
                  lineHeight: '45px',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <TextStyle variation='strong'>Layout</TextStyle>
              </div>
              <BlockLayerManager />
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
                    tab={(
                      <Stack spacing='none'>
                        <EditOutlined />
                        <TextStyle>Edit</TextStyle>
                      </Stack>
                    )}
                    key={ActiveTabKeys.EDIT}
                  >
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        paddingLeft: 20,
                        paddingRight: 20,
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      <EditEmailPreview />
                    </div>
                  </TabPane>
                  <TabPane
                    tab={(
                      <Stack spacing='none'>
                        <DesktopOutlined />
                        <TextStyle>Preview</TextStyle>
                      </Stack>
                    )}
                    key={ActiveTabKeys.PC}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <DesktopEmailPreview />
                  </TabPane>
                  <TabPane
                    tab={(
                      <Stack spacing='none'>
                        <TabletOutlined />
                        <TextStyle>Preview</TextStyle>
                      </Stack>
                    )}
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
            width={280}
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
