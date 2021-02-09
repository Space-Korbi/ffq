import React, { Fragment } from 'react';
import { string, element, arrayOf } from 'prop-types';

function CardTabContents({ cardId, tabNames, tabContents, selectedTab }) {
  return (
    <>
      {tabNames.map((tabName, tabIndex) => {
        const tabNameLowerCase = tabName.toLowerCase();
        return (
          <Fragment key={tabName}>
            <div
              className={
                tabNameLowerCase === selectedTab.toLowerCase()
                  ? 'tab-pane fade show active'
                  : 'tab-pane fade'
              }
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
  tabContents: arrayOf(element).isRequired,
  selectedTab: string.isRequired
};

export default CardTabContents;
