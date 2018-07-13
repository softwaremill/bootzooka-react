import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class RecoverLostPassword extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        login: ''
      },
      touchedControls: {
        login: false
      },
      resetComplete: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { login } = this.state.values;
      const { data: response } = await axios.post('api/passwordreset', { login });
      if (response === 'success') {
        this.setState({ resetComplete: true });
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

  isValid() {
    return this.state.values.login.length > 0;
  }

  render() {
    return (
      this.state.resetComplete ? <Redirect to="/login" />
      : <div className="RecoverLostPassword">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="login" placeholder="Email address or login"
              onChange={({ target }) => this.handleValueChange('login', target.value)}
              onBlur={() => this.handleBlur('login')} />
            { this.state.touchedControls.login && this.state.values.login.length < 1 ? <p className="validation-message">login or email address is required!</p> : null }
            <input type="submit" value="Reset password" className="button-primary" disabled={!this.isValid()} />
          </form>
        </div>
    );
  }
}

export default RecoverLostPassword;
