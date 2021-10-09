import React, { useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Stack } from '../Stack';
import { pushEvent } from '@example/util/pushEvent';
import { githubButtonGenerate } from '@/utils/githubButtonGenerate';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface FrameProps {
  title: string;
  breadcrumb?: React.ReactElement;
  primaryAction?: React.ReactElement;
  children: React.ReactElement;
}

export default function Frame({
  children,
  title,
  primaryAction,
  breadcrumb,
}: FrameProps) {
  useEffect(() => {
    githubButtonGenerate();
  }, []);

  return (
    <Layout>
      <Header style={{ padding: '0 20px' }}>
        <Stack distribution='equalSpacing'>
          <h1 style={{ color: 'white' }}>Easy-email</h1>

          <div style={{ marginTop: 10 }}>
            <Stack>
              <a
                className='github-button'
                href='https://github.com/m-Ryan/easy-email'
                data-size='large'
                data-icon='octicon-star'
                data-show-count='true'
                aria-label='Star m-Ryan/easy-email on GitHub'
                onClick={() => pushEvent({ name: 'Star' })}
                style={{ opacity: 0 }}
              >
                Star
              </a>

              <a
                className='github-button'
                href='https://github.com/m-Ryan/easy-email/fork'
                data-size='large'
                data-show-count='true'
                aria-label='Fork m-Ryan/easy-email on GitHub'
                onClick={() => pushEvent({ name: 'Fork' })}
                style={{ opacity: 0 }}
              >
                Fork
              </a>

              <a
                className='github-button'
                href='https://github.com/m-Ryan/easy-email/issues'
                data-size='large'
                data-show-count='true'
                aria-label='Issue m-Ryan/easy-email on GitHub'
                onClick={() => pushEvent({ name: 'Issue' })}
                style={{ opacity: 0 }}
              >
                Issue
              </a>
            </Stack>
          </div>
        </Stack>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key='sub1' title='Templates'>
              <Menu.Item key='1'>Templates</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Stack vertical>
            {breadcrumb && (
              <Breadcrumb>
                <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
              </Breadcrumb>
            )}

            <Stack distribution='equalSpacing' alignment='center'>
              <Stack.Item>
                <h2>
                  <strong>{title}</strong>
                </h2>
              </Stack.Item>
              <Stack.Item>{primaryAction}</Stack.Item>
            </Stack>

            <Stack.Item>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  backgroundColor: '#fff',
                }}
              >
                {children}
              </Content>
            </Stack.Item>
          </Stack>
        </Layout>
      </Layout>
    </Layout>
  );
}
