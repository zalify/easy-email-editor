import React, { useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
import { Stack } from '../Stack';
import { pushEvent } from '@demo/utils/pushEvent';
import { githubButtonGenerate } from '@demo/utils/githubButtonGenerate';
import { useShowCommercialEditor } from '@demo/hooks/useShowCommercialEditor';

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
  const { featureEnabled } = useShowCommercialEditor();
  return (
    <Layout>
      <Header style={{ padding: '0 20px', backgroundColor: '#001529' }}>
        <Stack
          distribution='equalSpacing'
          alignment='center'
        >
          <h1 style={{ color: 'white', margin: '15px 0' }}>Easy-email</h1>

          <div style={{ marginTop: 10 }}>
            <Stack
              distribution='equalSpacing'
              alignment='center'
            >
              <a
                href='https://www.buymeacoffee.com/easyemail?utm_source=webside&utm_medium=button&utm_content=donate'
                target='_blank'
                onClick={() => pushEvent({ event: 'Donate' })}
              >
                <img
                  src='https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png'
                  alt='Buy Me A Coffee'
                />
              </a>
              <a
                className='github-button'
                href='https://github.com/arco-design/easy-email?utm_source=webside&utm_medium=button&utm_content=star'
                data-size='large'
                data-icon='octicon-star'
                data-show-count='true'
                aria-label='Star m-Ryan/easy-email on GitHub'
                style={{ opacity: 0 }}
              >
                Star
              </a>

              <a
                className='github-button'
                href='https://github.com/arco-design/easy-email/fork?utm_source=webside&utm_medium=button&utm_content=fork'
                data-size='large'
                data-show-count='true'
                aria-label='Fork m-Ryan/easy-email on GitHub'
                style={{ opacity: 0 }}
              >
                Fork
              </a>

              <a
                className='github-button'
                href='https://github.com/arco-design/easy-email/issues?utm_source=webside&utm_medium=button&utm_content=issues'
                data-size='large'
                data-show-count='true'
                aria-label='Issue m-Ryan/easy-email on GitHub'
                onClick={() => pushEvent({ event: 'Issue' })}
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
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu
              key='sub1'
              title='Templates'
            >
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

            <Stack
              distribution='equalSpacing'
              alignment='center'
            >
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
