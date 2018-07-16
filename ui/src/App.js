import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';
import NotFound from './NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import RecoverLostPassword from './RecoverLostPassword/RecoverLostPassword';
import Register from './Register/Register';
import Spinner from './Spinner/Spinner';
import Welcome from './Welcome/Welcome';
import withForkMe from './ForkMe/ForkMe';
import SecretMain from './SecretMain/SecretMain';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
      isLoadingAuthInfo: true
    };
  }

  async componentDidMount() {
    try {
      const { data: user } = await this.props.authService.getCurrentUser();
      this.setState({ isLoggedIn: true, user, isLoadingAuthInfo: false });
    } catch (_error) {
      // user is not logged in
      // TODO the backend API should not throw in case of user not logged in - it should rather return an information about that fact.
      this.setState({ isLoadingAuthInfo: false });
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
    const { isLoadingAuthInfo, isLoggedIn, user } = this.state;
    return (
      isLoadingAuthInfo ? <Spinner />
      : <div className="App">
          <NavBar isLoggedIn={isLoggedIn} user={user} logout={this.logout.bind(this)} />
          <Switch>
            <Route exact path="/" render={() => withForkMe(<Welcome />)} />
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/main" component={SecretMain} />
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile" render={() => <p>profile</p>} />
            <Route path="/login" render={() => withForkMe(<Login authService={authService} onLoggedIn={this.onLoggedIn.bind(this)} />)} />
            <Route path="/register" render={() => withForkMe(<Register authService={authService} />)} />
            <Route path="/recover-lost-password" render={() => withForkMe(<RecoverLostPassword authService={authService} />)} />
            <Route path="/reset-password">
              <p>reset password</p>
            </Route>
            <Route render={() => withForkMe(<NotFound />)} />
          </Switch>
        </div>
    );
  }
}

App.propTypes = {
  authService: PropTypes.shape({
    logout: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
  }).isRequired
};

export default App;
