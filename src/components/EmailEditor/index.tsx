import {
  DesktopOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { ComponentsPanel } from './components/ComponentsPanel';
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
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { getPageIdx } from '@/utils/block';
export interface EmailEditorProps {
  height: string | number;
}
const TabPane = Tabs.TabPane;

export const EmailEditor = (props: EmailEditorProps) => {
  const { height: containerHeight } = props;
  const { activeTab, setActiveTab } = useActiveTab();
  const { pageData } = useEditorContext();
  const { setFocusIdx } = useFocusIdx();

  const backgroundColor = pageData.attributes['background-color'];

  const fixedContainer = useMemo(() => {
    return createPortal(<div id={FIXED_CONTAINER_ID} />, document.body);
  }, []);

  const onPageFocus = useCallback(() => {
    setFocusIdx(getPageIdx());
  }, [setFocusIdx]);

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
          <Layout.Sider theme='light' width={340}>
            <div
              id='leftSide'
              style={{
                maxHeight: '100%',
                height: containerHeight,
              }}
              className={styles.customScrollBar}
            >
              <ComponentsPanel />
            </div>
          </Layout.Sider>

          <Layout>
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
                      position: 'relative'
                    }}

                  >
                    <div onClick={onPageFocus} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
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
          </Layout>

          <Layout.Sider theme='light' width={350}>
            <div
              id='rightSide'
              style={{
                maxHeight: '100%',
                height: containerHeight,
                overflowY: 'overlay' as any,
              }}
              className={styles.customScrollBar}
            >
              <ConfigurationPanel />
            </div>
          </Layout.Sider>
        </div>

        {fixedContainer}
      </Layout>
    ),
    [activeTab, backgroundColor, containerHeight, fixedContainer, onPageFocus, setActiveTab]
  );
};
