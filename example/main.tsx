
import { render } from 'react-dom';
import React from 'react';
import App from './App';
import { UserStorage } from './util/user-storage';
import { message } from 'antd';
import { Loading } from './components/loading';

render(<Loading loading={true}><div style={{ height: '100vh', width: '100vw' }}></div></Loading>, document.getElementById('root'));

UserStorage.getAccount()
  .then(() => {
    render(<App />, document.getElementById('root'));
  })
  .catch((err) => message.error(err.message));

