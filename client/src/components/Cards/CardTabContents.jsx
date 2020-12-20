import React, { Fragment } from 'react';
import { string, element, arrayOf } from 'prop-types';

function CardTabContents({ cardId, tabNames, tabContents }) {
  return (
    <>
      {tabNames.map((tabName, tabIndex) => {
        const tabNameLowerCase = tabName.toLowerCase();
        return (
          <Fragment key={tabName}>
            <div
              className={tabIndex === 0 ? 'tab-pane fade show active' : 'tab-pane fade'}
              id={`${tabNameLowerCase}${cardId}`}
              role="tabpanel"
              aria-labelledby={`${tabNameLowerCase}-tab${cardId}`}
            >
              {tabContents[tabIndex]}
            </div>
          </Fragment>
        );
      })}
    </>
  );
}

CardTabContents.propTypes = {
  cardId: string.isRequired,
  tabNames: arrayOf(string).isRequired,
  tabContents: arrayOf(element).isRequired
};

export default CardTabContents;
