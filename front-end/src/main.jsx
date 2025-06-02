import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterConfig from './router/RouterConfig';
import '@fontsource-variable/hanken-grotesk'
import './styles/fonts.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);
