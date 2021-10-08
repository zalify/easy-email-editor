import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page from '@example/components/Page';
import store from '@example/store';
import '@example/styles/common.scss';
import { history } from './util/history';

const Home = React.lazy(() => import('@example/pages/Home'));

const Editor = React.lazy(() => import('@example/pages/Editor'));

export default function App() {
  return (
    <Provider store={store}>
      <Page>
        <Suspense
          fallback={(
            <div
              style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                width='200px'
                src='https://assets.maocanhua.cn/Fj1gmWbF-aY3ZnPyrTrDge6atRnm'
                alt=''
              />
              <p
                style={{
                  fontSize: 24,
                  color: 'rgba(0, 0, 0, 0.65)',
                }}
              >
                Please wait a moment.
              </p>
            </div>
          )}
        >
          <Router history={history}>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/editor' component={Editor} />
            </Switch>
          </Router>
        </Suspense>
      </Page>
    </Provider>
  );
}
