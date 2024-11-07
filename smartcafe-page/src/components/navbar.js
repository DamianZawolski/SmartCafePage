// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Clock from './clock';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link className="navbar-brand text-white" to="/">SmartCafe</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">Login</Link>
          </li>
        </ul>
        <Clock />
      </div>
    </nav>
  );
}

export default Navbar;