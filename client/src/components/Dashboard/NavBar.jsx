import React from 'react';
import { bool } from 'prop-types';
import { useRouteMatch, NavLink } from 'react-router-dom';

// services
import { authService } from '../../services';

// logo
import { ReactComponent as Logo } from '../../hi-ffq_v8_react.svg';

const adminLinks = [
  {
    name: 'Editor',
    to: '/questionnaireEditor',
    className: 'nav-link',
    activeClassName: 'nav-link active'
  },
  {
    name: 'Preview',
    to: '/questionnairePresenter',
    className: 'nav-link',
    activeClassName: 'nav-link active'
  },
  {
    name: 'User Manager',
    to: '/participantsManager',
    className: 'nav-link',
    activeClassName: 'nav-link active'
  },
  {
    name: 'Account',
    to: '/account',
    className: 'nav-link',
    activeClassName: 'nav-link active'
  }
];

function NavBar({ isAdmin }) {
  const { url, params } = useRouteMatch();

  const userLinks = [
    {
      name: 'Home',
      to: '',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'Account',
      to: '/account',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    }
  ];

  return (
    <div>
      <nav
        className={
          isAdmin ? 'navbar navbar-expand-md navbar-dark bg-dark' : 'navbar navbar-dark bg-dark'
        }
      >
        <a className="navbar-brand bg-transparent shadow-none p-0" href={`/users/${params.userId}`}>
          <Logo className="App-logo" width="36" height="36" />
        </a>
        {/* <Link
            className="navbar-brand bg-transparent shadow-none p-0"
            to={`/users/${params.userId}`}
          >
            <img src="../../hi-ffq.png" width="34" height="34" alt="" loading="lazy" />
          </Link> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <div className="flex-grow-1">
            {isAdmin && (
              <div>
                <ul className="navbar-nav mr-auto">
                  {adminLinks.map((link) => (
                    <li className="nav-item" key={link.name}>
                      <NavLink
                        to={`${url}${link.to}`}
                        className={link.className}
                        activeClassName={link.activeClassName}
                        key={link.name}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!isAdmin && (
              <ul className="navbar-nav">
                {userLinks.map((link) => (
                  <li className="nav-item" key={link.name}>
                    <NavLink
                      exact
                      to={`${url}${link.to}`}
                      className={link.className}
                      activeClassName={link.activeClassName}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link ml-auto" href="/login" onClick={() => authService.logout()}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  isAdmin: bool.isRequired
};

export default NavBar;
