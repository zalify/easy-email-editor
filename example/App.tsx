import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@example/store';
import './theme.less';
import '@example/styles/common.scss';
import Page from '@example/components/Page';
import { history } from './util/history';
import { Loading } from './components/loading';

const Home = React.lazy(() => import('@example/pages/Home'));

const Editor = React.lazy(() => import('@example/pages/Editor'));

export default function App() {
  return (
    <Suspense
      fallback={() => (
        <Loading loading>
          <div style={{ height: '100vh', width: '100vw' }} />
        </Loading>
      )}
    >
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
    </Suspense>
  );
}
