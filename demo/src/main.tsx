import { render } from 'react-dom';
import React from 'react';
import App from './App';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://dcc8b6eb106b43fcbe6385fb491871ad@o1071232.ingest.sentry.io/6068046",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

render(<App />, document.getElementById("root")!);
