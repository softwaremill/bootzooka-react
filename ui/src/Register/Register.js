import React, { Component } from 'react';
import { validateEmail, validateUsername, validatePassword } from '../validation/validation';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        username: '',
        email: '',
        password: '',
        repeatedPassword: ''
      },
      touchedControls: {
        username: false,
        email: false,
        password: false,
        repeatedPassword: false
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // TODO shoop da whoop
    event.preventDefault();
  }

  handleValueChange(key, value) {
    this.setState(state => ({ ...state, values: { ...state.values, [key]: value } }));
  }

  handleBlur(inputName) {
    this.setState(state => ({ ...state, touchedControls: { ...state.touchedControls, [inputName]: true } }));
  }

  getUsernameErrors() {
    return this.state.touchedControls.username ? validateUsername(this.state.values.username) : [];
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
    const { email, password, repeatedPassword, username } = this.state.values;
    return validateUsername(username).length === 0
    && validateEmail(email).length === 0
    && validatePassword(password).length === 0
    && validatePassword(repeatedPassword).length === 0
    && this.passwordEntriesMatch();
  }

  render () {
    return (
      <div className="Register">
        <h4>Please sign up</h4>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="Username"
            onChange={({ target }) => this.handleValueChange('username', target.value)}
            onBlur={() => this.handleBlur('username')} />
          { this.getUsernameErrors().map((errorMsg, idx) => <p className="Register__validation-message" key={idx}>{errorMsg}</p>) }
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
