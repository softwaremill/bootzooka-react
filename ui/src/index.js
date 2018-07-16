import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import AuthService from './AuthService/AuthService';

const authService = new AuthService();

ReactDOM.render(
  <BrowserRouter>
    <App authService={authService} />
  </BrowserRouter>,
  document.getElementById('root')
);
