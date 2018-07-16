import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar/NavBar';
import Welcome from './Welcome/Welcome';
import NotFound from './NotFound/NotFound';
import Register from './Register/Register';
import RecoverLostPassword from './RecoverLostPassword/RecoverLostPassword';
import Login from './Login/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
    };
  }

  async componentDidMount() {
    try {
      const { data: userData } = await this.props.authService.getCurrentUser();
      this.onLoggedIn(userData);
    } catch (_error) {
      // user is not logged in
      // TODO the backend API should not throw in case of user not logged in - it should rather return an information about that fact.
    }
  }

  onLoggedIn(user) {
    this.setState({ isLoggedIn: true, user });
  }

  async logout() {
    try {
      await this.props.authService.logout();
      this.setState({ isLoggedIn: false, user: null });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { authService } = this.props;
    const { isLoggedIn, user } = this.state;
    return (
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} user={user} logout={this.logout.bind(this)} />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/home">
            <p>home</p>
          </Route>
          <Route path="/profile">
            <p>profile</p>
          </Route>
          <Route path="/login" render={() => <Login authService={authService} onLoggedIn={this.onLoggedIn.bind(this)} />} />
          <Route path="/register" render={() => <Register authService={authService} />} />
          <Route path="/recover-lost-password" render={() => <RecoverLostPassword authService={authService} />} />
          <Route path="/reset-password">
            <p>reset password</p>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
