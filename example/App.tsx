import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { Stack } from '@/components/Stack';
import { BasicType } from '@/constants';
import { EmailEditorProvider, EmailEditor } from '@/index';
import { IEmailTemplate } from '@/typings';
import services from '@example/services';
import { Layout, Button, PageHeader } from 'antd';
import React from 'react';
import { ToolPanel } from './ToolPanel';

export default function App() {
  const onSubmit = () => { };

  const data: IEmailTemplate = {
    content: {
      type: BasicType.PAGE,
      data: {
        value: {},
      },
      attribute: {},
      children: [],
    },
    subject: '',
    subTitle: 'string',
  };

  return (
    <EmailEditorProvider
      data={data}
      onSubmit={onSubmit}
      uploadHandler={services.common.uploadByQiniu}
    >
      {({ handleSubmit }) => {
        return (
          <Layout
            style={{
              height: '100vh',
              overflow: 'hidden',
            }}
          >
            <PageHeader
              style={{ backgroundColor: '#fff' }}
              extra={(
                <Stack>
                  <Button type="primary" onClick={() => handleSubmit()}>export</Button>
                </Stack>
              )}
            />
            <Layout>
              <div style={{ display: 'flex', width: '100vw' }}>
                <Layout.Sider theme='light' width={302}>
                  <div
                    id='leftSide'
                    style={{
                      height: '100%',
                      overflow: 'overlay',
                    }}
                  >
                    <ToolPanel />
                  </div>
                </Layout.Sider>

                <Layout>
                  <div id='centerEditor'>
                    <EmailEditor />
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
          </Layout>
        );
      }}
    </EmailEditorProvider>
  );
}
