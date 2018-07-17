import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import UserService from './UserService/UserService';

const userService = new UserService();

ReactDOM.render(
  <BrowserRouter>
    <App userService={userService} />
  </BrowserRouter>,
  document.getElementById('root')
);
