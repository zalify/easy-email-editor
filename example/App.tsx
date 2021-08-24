import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page from '@example/components/Page';
import Home from '@example/pages/Home';
import store from '@example/store';
import './theme.less';
import '@example/styles/common.scss';
import Editor from '@example/pages/Editor';
import { history } from './util/history';

export default function App() {
  return (
    <Provider store={store}>
      <Page>
        <Router history={history}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/editor' component={Editor} />
          </Switch>
        </Router>
      </Page>
    </Provider>
  );
}
