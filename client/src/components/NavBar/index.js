/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Links from '../Dashboard/Links';
import Logo from './Logo';

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Logo />
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Links />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
