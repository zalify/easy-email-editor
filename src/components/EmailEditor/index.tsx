import {
  DesktopOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import React, { useMemo, useState } from 'react';
import { IframeComponent } from '@/components/UI/IframeComponent';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { ComponentsPanel } from './components/ComponentsPanel';
import { EmailContent } from './components/EmailContent';
import { PreviewEmail } from './components/PreviewEmail';
import { Stack } from '../UI/Stack';
import { TextStyle } from '../UI/TextStyle';
import { ToolsPanel } from './components/ToolsPanel';
import './index.scss';
import styles from './index.module.scss';
import { useEditorContext } from '@/hooks/useEditorContext';
import { ShadowDom } from '../UI/ShadowDom';
import { createPortal } from 'react-dom';
import { FIXED_CONTAINER_ID } from '@/constants';
import { useActiveTab } from '@/hooks/useActiveTab';
import { ActiveTabKeys } from '../Provider/BlocksProvider';

const TabPane = Tabs.TabPane;

export interface EmailEditorProps {
  height: string | number;
}
export const EmailEditor = (props: EmailEditorProps) => {
  const { height: containerHeight } = props;
  const { activeTab, setActiveTab } = useActiveTab();
  const { pageData } = useEditorContext();

  const pageMaxWidth = pageData.attributes.width || '600px';
  const pageMinWidth = '375px';

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
                backgroundColor: pageData.attributes['background-color'],
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
                  tab={
                    <Stack spacing='none'>
                      <EditOutlined />
                      <TextStyle>Edit</TextStyle>
                    </Stack>
                  }
                  key={ActiveTabKeys.EDIT}
                  style={{
                    backgroundColor: 'transparent',
                    paddingLeft: 20,
                    paddingRight: 20,
                    height: '100%',
                  }}
                >
                  <ShadowDom
                    id='VisualEditorEditMode'
                    style={{
                      width: pageMaxWidth,
                      padding: '40px 0px',
                      margin: 'auto',
                      height: '100%',
                    }}
                  >
                    <EmailContent />
                  </ShadowDom>
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
                  <div
                    style={{
                      width: pageMaxWidth,
                      padding: '40px 0px',
                      margin: 'auto',
                      height: '100%',
                    }}
                  >
                    <IframeComponent
                      height='100%'
                      width='100%'
                      style={{ border: 'none', paddingTop: -16 }}
                    >
                      <PreviewEmail scroll />
                    </IframeComponent>
                  </div>
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
                  <div
                    style={{
                      width: 320,
                      padding: '40px 0px',
                      margin: 'auto',
                      height: '100%',
                    }}
                  >
                    <IframeComponent
                      height='100%'
                      width='100%'
                      style={{ paddingTop: -16 }}
                      className={styles.app}
                    >
                      <style>
                        {`
                        body *::-webkit-scrollbar {
                          width: 0px;
                          background-color: transparent;
                        }
                      `}
                      </style>
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
    [
      activeTab,
      containerHeight,
      fixedContainer,
      pageData.attributes,
      pageMaxWidth,
      setActiveTab,
    ]
  );
};
