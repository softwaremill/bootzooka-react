import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar/NavBar';
import Welcome from './Welcome/Welcome';
import NotFound from './NotFound/NotFound';

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
          <Route path="/register">
            <p>register</p>
          </Route>
          <Route path="/recover-lost-password">
            <p>recover lost password</p>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
