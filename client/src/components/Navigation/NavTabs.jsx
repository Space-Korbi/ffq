import React from 'react';
import { arrayOf, string } from 'prop-types';

const NavTabs = ({ tabNames }) => {
  return (
    <>
      <ul
        className="nav nav-pills flex-nowrap text-nowrap"
        style={{ overflowX: 'auto', overflowY: 'hidden' }}
        id="navigation"
        role="tablist"
      >
        {tabNames.map((tabName, index) => {
          const tabNameLowerCase = tabName.replace(/\s/g, '').toLowerCase();
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
      <hr className="my-2" />
    </>
  );
};

NavTabs.propTypes = {
  tabNames: arrayOf(string).isRequired
};

export default NavTabs;
