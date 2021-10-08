import { render } from 'react-dom';
import React from 'react';
import App from './App';
import { UserStorage } from './util/user-storage';
import { message } from 'antd';
import 'antd/dist/antd.css';

UserStorage.getAccount()
  .then(() => {
    render(<App />, document.getElementById('root'));
  })
  .catch((err) => message.error(err.message));
