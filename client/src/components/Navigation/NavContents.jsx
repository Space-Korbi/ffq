import React, { Fragment } from 'react';
import { string, element, arrayOf } from 'prop-types';

const NavContents = ({ tabNames, tabContents }) => {
  return (
    <div className="tab-content" id="questionEditorContent">
      {tabNames.map((tabName, tabIndex) => {
        const tabNameLowerCase = tabName.toLowerCase();
        return (
          <Fragment key={tabName}>
            <div
              className={tabIndex === 0 ? 'tab-pane fade show active' : 'tab-pane fade'}
              id={`${tabNameLowerCase}`}
              role="tabpanel"
              aria-labelledby={`${tabNameLowerCase}-tab`}
            >
              {tabContents[tabIndex]}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

NavContents.propTypes = {
  tabNames: arrayOf(string).isRequired,
  tabContents: arrayOf(element).isRequired
};

export default NavContents;
