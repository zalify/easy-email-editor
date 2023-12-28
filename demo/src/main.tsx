import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// if (process.env.NODE_ENV === "production") {
//   Sentry.init({
//     dsn: "https://dcc8b6eb106b43fcbe6385fb491871ad@o1071232.ingest.sentry.io/6068046",
//     integrations: [new BrowserTracing()],
//     tracesSampleRate: 1.0,
//   });
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

// render(<App />, document.getElementById("root")!);
