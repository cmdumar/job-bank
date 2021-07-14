import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ColorModeScript />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
