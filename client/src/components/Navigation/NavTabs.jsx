import React from 'react';
import { arrayOf, string } from 'prop-types';

const NavTabs = ({ tabNames }) => {
  return (
    <ul className="nav nav-tabs" id="navigation" role="tablist">
      {tabNames.map((tabName, index) => {
        const tabNameLowerCase = tabName.toLowerCase();
        return (
          <li className="nav-item" key={tabName}>
            <a
              className={index === 0 ? 'nav-link active' : 'nav-link'}
              id={`${tabNameLowerCase}-tab`}
              data-toggle="tab"
              href={`#${tabNameLowerCase}`}
              role="tab"
              aria-controls={tabNameLowerCase}
              aria-selected="true"
            >
              {tabName}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

NavTabs.propTypes = {
  tabNames: arrayOf(string).isRequired
};

export default NavTabs;
