import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { validateEmail, validateLogin, validatePassword } from '../validation/validation';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        login: '',
        email: '',
        password: '',
        repeatedPassword: ''
      },
      touchedControls: {
        login: false,
        email: false,
        password: false,
        repeatedPassword: false
      },
      registered: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { login, email, password } = this.state.values;
      const { data: response } = await axios.post('api/users/register', { login, email, password });
      if (response === 'success') {
        this.setState({ registered: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleValueChange(key, value) {
    this.setState(state => ({ ...state, values: { ...state.values, [key]: value } }));
  }

  handleBlur(inputName) {
    this.setState(state => ({ ...state, touchedControls: { ...state.touchedControls, [inputName]: true } }));
  }

  getLoginErrors() {
    return this.state.touchedControls.login ? validateLogin(this.state.values.login) : [];
  }

  getEmailErrors() {
    return this.state.touchedControls.email ? validateEmail(this.state.values.email) : [];
  }

  getPasswordErrors(inputName) {
    return this.state.touchedControls[inputName] ? validatePassword(this.state.values[inputName]) : [];
  }

  passwordEntriesMatch() {
    return this.state.values.password === this.state.values.repeatedPassword;
  }

  isValid () {
    const { email, password, repeatedPassword, login } = this.state.values;
    return validateLogin(login).length === 0
    && validateEmail(email).length === 0
    && validatePassword(password).length === 0
    && validatePassword(repeatedPassword).length === 0
    && this.passwordEntriesMatch();
  }

  render () {
    return (
      this.state.registered ? <Redirect to="/login" />
      : <div className="Register">
          <h4>Please sign up</h4>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="login" placeholder="Login"
              onChange={({ target }) => this.handleValueChange('login', target.value)}
              onBlur={() => this.handleBlur('login')} />
            { this.getLoginErrors().map((errorMsg, idx) => <p className="Register__validation-message" key={idx}>{errorMsg}</p>) }
            <input type="email" name="email" placeholder="Email address"
              onChange={({ target }) => this.handleValueChange('email', target.value)}
              onBlur={() => this.handleBlur('email')} />
            { this.getEmailErrors().map((errorMsg, idx) => <p className="Register__validation-message" key={idx}>{errorMsg}</p>) }
            <input type="password" name="password" placeholder="Password"
              onChange={({ target }) => this.handleValueChange('password', target.value)}
              onBlur={() => this.handleBlur('password')} />
            { this.getPasswordErrors('password').map((errorMsg, idx) => <p className="Register__validation-message" key={idx}>{errorMsg}</p>) }
            <input type="password" name="repeatedPassword" placeholder="Repeat password"
              onChange={({ target }) => this.handleValueChange('repeatedPassword', target.value)}
              onBlur={() => this.handleBlur('repeatedPassword')} />
            { this.getPasswordErrors('repeatedPassword').map((errorMsg, idx) => <p className="Register__validation-message" key={idx}>{errorMsg}</p>) }
            { this.state.touchedControls.repeatedPassword && !this.passwordEntriesMatch() ? <p className="Register__validation-message">passwords don't match!</p> : null }
            <input type="submit" value="Register" className="button-primary" disabled={!this.isValid()} />
          </form>
        </div>
    );
  }
}

export default Register;
