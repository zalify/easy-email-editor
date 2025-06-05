import { Alert, Layout, Menu } from '@arco-design/web-react';
import styles from './index.module.less';
import cs from 'classnames';
import qs from 'query-string';
import { ReactNode, useEffect, useState } from 'react';
import { IconDashboard, IconEmail } from '@arco-design/web-react/icon';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Navbar } from './NavBar';

interface Props {
  children: React.ReactNode;
  hideSidebar?: boolean;
  hideNavbar?: boolean;
}

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;

type NavMenuItem = {
  label: string;
  icon?: ReactNode;
  children?: Array<NavMenuItem>;
  link: string;
};

const navigationMenus: Array<NavMenuItem> = [
  {
    label: 'Open source version',
    icon: <IconDashboard />,

    link: '/emails',
  },
  {
    label: 'Commercial version',
    icon: <IconEmail />,
    link: 'https://demo.easyemail.pro/full?utm_source=easyemail',
  },
];

export default function PageLayout({ children, hideNavbar, hideSidebar }: Props) {
  const router = useRouter();
  const pathname = router.pathname || '/emails';
  const currentComponent = qs.parseUrl(pathname).url.slice(1);

  const paths = currentComponent.split('/');
  const defaultSelectedKeys = paths[0] ? ['/' + paths[0]] : [];

  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultSelectedKeys);
  const navbarHeight = 60;
  const menuWidth = 220;
  const paddingTop = !hideNavbar ? { paddingTop: navbarHeight } : {};
  const paddingLeft = !hideSidebar ? { paddingLeft: menuWidth } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  function onClickMenuItem(key: string) {
    setSelectedKeys([key]);
  }

  return (
    <>
      {!hideNavbar && (
        <Layout className={styles.layout}>
          <div
            className={cs(styles['layout-navbar'], {
              // [styles['layout-navbar-hidden']]: !showNavbar,
            })}
          >
            <Navbar />
          </div>
        </Layout>
      )}
      <Layout>
        {!hideSidebar && (
          <Sider
            className={styles['layout-sider']}
            width={menuWidth}
            trigger={null}
            collapsible
            breakpoint='xl'
            style={paddingTop}
          >
            <div className={styles['menu-wrapper']}>
              <Menu
                onClickMenuItem={onClickMenuItem}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onClickSubMenu={(_, openKeys) => {
                  setOpenKeys(openKeys);
                }}
              >
                {navigationMenus.map(menu => {
                  if (menu.children && menu.children.length > 0) {
                    return (
                      <SubMenu
                        key={menu.link}
                        title={
                          <>
                            <div style={{ position: 'absolute' }}>{menu.icon}</div>
                            <div style={{ marginLeft: 21 }}>{menu.label}</div>
                          </>
                        }
                      >
                        {menu.children.map(child => {
                          return (
                            <MenuItem key={child.link}>
                              {child.icon}
                              <Link href={child.link}>
                                <a>{child.label}</a>
                              </Link>
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    );
                  }
                  return (
                    <MenuItem key={menu.link}>
                      {menu.icon}
                      <Link href={menu.link}>
                        <a>{menu.label}</a>
                      </Link>
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          </Sider>
        )}

        <Layout
          id='organization-layout'
          className={styles['layout-content']}
          style={paddingStyle}
        >
          <Layout.Content className={styles['layout-content-wrapper']}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}
