import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterConfig from './router/RouterConfig';
import './styles/index.css';
import './styles/font.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);
