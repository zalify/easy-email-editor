import React from 'react';
import { Avatar, Dropdown, Menu } from '@arco-design/web-react';
import { IconPoweroff } from '@arco-design/web-react/icon';

import styles from './style/index.module.less';
import { signOut, useSession } from 'next-auth/react';

export const Navbar: React.FC = () => {
  const { data } = useSession();

  const user = data?.user;
  const droplist = (
    <Menu>
      <Menu.Item
        key='logout'
        onClick={() => {
          signOut();
        }}
      >
        <IconPoweroff className={styles['dropdown-icon']} />
        Logout
      </Menu.Item>
      <Menu.Item key='email'>{user?.email}</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>Easy Email</div>
      </div>
      <ul className={styles.right}>
        {user && (
          <li>
            <Dropdown
              droplist={droplist}
              position='br'
            >
              <Avatar
                size={32}
                style={{ cursor: 'pointer', backgroundColor: '#1d1d3d' }}
              >
                {(user.name || user.email)?.toUpperCase()}
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  );
};
