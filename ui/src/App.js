import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar/NavBar';
import Welcome from './Welcome/Welcome';
import NotFound from './NotFound/NotFound';
import Register from './Register/Register';

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
          <Route component={Register} />
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
