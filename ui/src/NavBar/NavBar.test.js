import React from 'react';
import { NavLink } from 'react-router-dom';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

it('should contain 4 links', () => {
  const wrapper = shallow(<NavBar />);
  expect(wrapper.find(NavLink).length).toBe(4);
});
