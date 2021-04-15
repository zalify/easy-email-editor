import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Stack } from '../Stack';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface FrameProps {
  title: string;
  breadcrumb?: React.ReactElement;
  primaryAction?: React.ReactElement;
  children: React.ReactElement;
}

export default function Frame({ children, title, primaryAction, breadcrumb }: FrameProps) {
  return (
    <Layout>
      <Header>
        <Stack alignment="center">
          <h1 style={{ color: 'white' }}>easyH5</h1>
        </Stack>

      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: 'calc(100vh - 64px)', borderRight: 0 }}
          >
            <SubMenu key="sub1" title="数据模板">
              <Menu.Item key="1">数据模板</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Stack vertical>
            {
              breadcrumb && (
                <Breadcrumb>
                  <Breadcrumb.Item>
                    {breadcrumb}
                  </Breadcrumb.Item>
                </Breadcrumb>
              )
            }

            <Stack distribution="equalSpacing" alignment="center">
              <Stack.Item><h2><strong>{title}</strong></h2></Stack.Item>
              <Stack.Item>{primaryAction}</Stack.Item>
            </Stack>

            <Stack.Item>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  backgroundColor: '#fff'
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