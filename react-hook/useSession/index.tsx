import React from 'react';
import ReactDOM from 'react-dom';

import { SessionProvider } from './sessionContext';

import App from './app';

ReactDOM.render(
    <React.StrictMode>
      <SessionProvider>
        <App />
      </SessionProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  