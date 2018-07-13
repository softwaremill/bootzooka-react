import React from 'react';
import { shallow } from 'enzyme';
import Register from './Register';

describe('structure', () => {
  it('should contain username input', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('input[name="username"]').length).toBe(1);
  });

  it('should contain email input', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('input[name="email"]').length).toBe(1);
  });

  it('should contain password input', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('input[name="password"]').length).toBe(1);
  });

  it('should contain repeatedPassword input', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('input[name="repeatedPassword"]').length).toBe(1);
  });

  it('should contain register button', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('input[type="submit"]').length).toBe(1);
  });
});

describe('behaviour', () => {
  it('register button should initially be disabled', () => {
    const wrapper = shallow(<Register />);
    const registerButton = wrapper.find('input[type="submit"]');
    expect(registerButton.props().disabled).toBe(true);
  });

  it('an error should appear under empty username input on blur', () => {
    const wrapper = shallow(<Register />);
    const usernameInput = wrapper.find('input[name="username"]');
    usernameInput.simulate('blur');
    expect(wrapper.contains(<p className="Register__validation-message" key={0}>at least 2 characters required!</p>)).toBe(true);
  });

  it('an error should appear under empty password input on blur', () => {
    const wrapper = shallow(<Register />);
    const passwordInput = wrapper.find('input[name="password"]');
    passwordInput.simulate('blur');
    expect(wrapper.contains(<p className="Register__validation-message" key={0}>at least 5 characters required!</p>)).toBe(true);
  });

  it('an error should appear under empty repeated password input on blur', () => {
    const wrapper = shallow(<Register />);
    const repeatedPasswordInput = wrapper.find('input[name="repeatedPassword"]');
    repeatedPasswordInput.simulate('blur');
    expect(wrapper.contains(<p className="Register__validation-message" key={0}>at least 5 characters required!</p>)).toBe(true);
  });

  it('an error should appear under repeated password when passwords do not match and repeatedPassword input was touched', () => {
    const wrapper = shallow(<Register />);
    const initialState = wrapper.state();
    wrapper.setState({ touchedControls: { ...initialState.touchedControls, repeatedPassword: true}, values: { ...initialState.values, password: 'abcde', repeatedPassword: 'abcdefgh' } });
    expect(wrapper.contains(<p className="Register__validation-message" key={0}>passwords don't match!</p>)).toBe(true);
  });

  it('should enable register button when all inputs are correct', () => {
    const wrapper = shallow(<Register />);
    const initialState = wrapper.state();
    wrapper.setState({ ...initialState, values: { username: 'mickey', email: 'mickey@mou.se', password: 'P4sSW0Rd#1', repeatedPassword: 'P4sSW0Rd#1' } });
    const registerButton = wrapper.find('input[type="submit"]');
    expect(registerButton.props().disabled).toBe(false);
  });
});
