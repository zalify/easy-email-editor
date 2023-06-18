import React, { useEffect, useState } from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Alert,
  Modal,
  Form,
  Input,
  Message,
} from '@arco-design/web-react';
import { Stack } from '../Stack';
import { pushEvent } from '@demo/utils/pushEvent';
import { githubButtonGenerate } from '@demo/utils/githubButtonGenerate';
import axios from 'axios';

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
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  const postEmail = async () => {
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(text)) {
      Message.error('Please enter a valid email address');
      return;
    }
    pushEvent({
      event: 'TryNewEditor',
      payload: { email: text },
    });
    await axios.post(`/api/email`, {
      email: text,
    });
    setVisible(false);
  };

  useEffect(() => {
    githubButtonGenerate();
  }, []);

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
          <Alert
            title={<div>🎉 Try our commercial version of Email Editor! 🎉</div>}
            content={
              <div>
                <div>
                  We are developing a powerful commercial version of Email Editor that includes amazing responsive views(mobile only /desktop only), replaces Shadow DOM with iframes, and boasts a sleeker UI.

                </div>
                <div>
                  If you are interested, contact us now! Please leave your email address{' '}
                  <a
                    href='#'
                    onClick={e => {
                      e.preventDefault();
                      setVisible(true);
                    }}
                  >
                    here
                  </a>
                  , and we will get in touch with you. Alternatively, you can reach us
                  directly at{' '}
                  <a
                    target='_blank'
                    href='mailto:m-ryan@foxmail.com'
                  >
                    m-ryan@foxmail.com
                  </a>
                </div>
              </div>
            }
          ></Alert>
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
      <Modal
        title={<p style={{ textAlign: 'left' }}>Leave your email</p>}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={postEmail}
      >
        <Form.Item label='Email'>
          <Input
            value={text}
            onChange={setText}
          />
        </Form.Item>
      </Modal>
    </Layout>
  );
}
