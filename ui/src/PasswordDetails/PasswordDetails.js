import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validatePassword } from '../validation/validation';

class PasswordDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        currentPassword: '',
        newPassword: '',
        repeatedNewPassword: ''
      },
      touchedControls: {
        currentPassword: false,
        newPassword: false,
        repeatedNewPassword: false
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="PasswordDetails">
        <h4>Password details</h4>
      </div>
    );
  }
}

PasswordDetails.propTypes = {
  authService: PropTypes.shape({
    changePassword: PropTypes.func.isRequired
  }).isRequired,
};

export default PasswordDetails;
