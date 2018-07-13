import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar/NavBar';
import Welcome from './Welcome/Welcome';
import NotFound from './NotFound/NotFound';
import Register from './Register/Register';
import RecoverLostPassword from './RecoverLostPassword/RecoverLostPassword';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/home">
            <p>home</p>
          </Route>
          <Route path="/login">
            <p>login</p>
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/recover-lost-password" component={RecoverLostPassword} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
