import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () =>
  <div className="NavBar">
    <NavLink className="NavBar__link" activeClassName="NavBar__link--active" to="/" exact>SML Bootzooka</NavLink>
    <NavLink className="NavBar__link" activeClassName="NavBar__link--active" to="/home">Home</NavLink>
    <NavLink className="NavBar__link" activeClassName="NavBar__link--active" to="/register">Register</NavLink>
    <NavLink className="NavBar__link" activeClassName="NavBar__link--active" to="/login">Login</NavLink>
  </div>;

export default NavBar;
