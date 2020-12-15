import React from 'react';
import { arrayOf, string } from 'prop-types';

const Navigation = ({ tabs }) => {
  return (
    <ul className="nav nav-tabs" id="navigation" role="tablist">
      {tabs.map((tab, index) => {
        return (
          <li className="nav-item" key={tab}>
            <a
              className={index === 0 ? 'nav-link active' : 'nav-link'}
              id={`${tab}-tab`}
              data-toggle="tab"
              href={`#${tab}`}
              role="tab"
              aria-controls={tab}
              aria-selected="true"
            >
              {tab}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

Navigation.propTypes = {
  tabs: arrayOf(string).isRequired
};

export default Navigation;
