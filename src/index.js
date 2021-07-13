import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeScript } from '@chakra-ui/react';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
