import { render } from 'react-dom';
import React from 'react';
import App from './App';
import { UserStorage } from './utils/user-storage';

UserStorage.getAccount().then(() => {
  render(<App />, document.getElementById('root'));
});
