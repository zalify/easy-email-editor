import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { Stack } from '@/components/Stack';
import { BasicType } from '@/constants';
import { EmailEditorProvider, EmailEditor } from '@/index';
import { IEmailTemplate } from '@/typings';
import services from '@example/services';
import { Layout, Button, PageHeader } from 'antd';
import React from 'react';
import { ToolPanel } from './ToolPanel';

const data = {
  'type': 'page',
  'data': {
    'value': {

    }
  },
  'attribute': {

  },
  'children': [
    {
      'type': 'section',
      'data': {
        'value': {

        }
      },
      'attribute': {
        'padding-top': '20px',
        'padding-bottom': '20px',
        'padding-left': '0px',
        'padding-right': '0px',
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'top center',
        'border': 'none',
        'direction': 'ltr',
        'text-align': 'center'
      },
      'children': [
        {
          'type': 'column',
          'data': {
            'value': {

            }
          },
          'attribute': {
            'padding-top': '0px',
            'padding-bottom': '0px',
            'padding-left': '0px',
            'padding-right': '0px',
            'border': 'none',
            'vertical-align': 'top'
          },
          'children': [
            {
              'type': 'img',
              'data': {
                'value': {

                }
              },
              'attribute': {
                'align': 'center',
                'height': '40px',
                'padding-top': '10px',
                'padding-bottom': '10px',
                'padding-left': '25px',
                'padding-right': '25px',
                'src': 'https://assets.aftership.com/img/logos/traffic_logo_main.png',
                'target': '',
                'width': '275px'
              },
              'children': []
            }
          ]
        }
      ]
    },
    {
      'type': 'section',
      'data': {
        'value': {

        }
      },
      'attribute': {
        'padding-top': '20px',
        'padding-bottom': '20px',
        'padding-left': '0px',
        'padding-right': '0px',
        'background-repeat': 'none',
        'background-size': 'auto',
        'background-position': 'top center',
        'border': 'none',
        'direction': 'ltr',
        'text-align': 'center',
        'background-url': 'https://assets.aftership.com/img/trafficreport.png'
      },
      'children': [
        {
          'type': 'column',
          'data': {
            'value': {

            }
          },
          'attribute': {
            'padding-top': '0px',
            'padding-bottom': '0px',
            'padding-left': '0px',
            'padding-right': '0px',
            'border': 'none',
            'vertical-align': 'top'
          },
          'children': []
        }
      ]
    }
  ]
};

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
