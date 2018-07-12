import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}

export default App;
