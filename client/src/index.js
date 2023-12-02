import React from 'react';
import ReactDOM from 'react-dom/client';

// import dotenv from 'dotenv'
// import App from './App';

import { Provider } from 'react-redux';
import store from './store/store'
import Layout from './Layout';

// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Layout />
  </Provider>
  // </React.StrictMode>
);