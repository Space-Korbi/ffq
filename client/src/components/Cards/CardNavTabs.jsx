import React from 'react';
import { arrayOf, string } from 'prop-types';

const CardNavTabs = ({ cardId, tabNames }) => {
  return (
    <>
      <ul
        className="nav nav-tabs card-header-tabs card-header-tabs flex-nowrap ml-4"
        id="tab"
        role="tablist"
      >
        {tabNames.map((tabName, tabIndex) => {
          const tabNameLowerCase = tabName.toLowerCase();
          return (
            <li key={tabName + cardId} className="nav-item">
              <a
                className={tabIndex === 0 ? 'nav-link active' : 'nav-link'}
                id={`${tabNameLowerCase}-tab${cardId}`}
                data-toggle="tab"
                href={`#${tabNameLowerCase}${cardId}`}
                role="tab"
                aria-controls={`${tabNameLowerCase}${cardId}`}
                aria-selected={tabIndex === 0 ? 'true' : 'false'}
              >
                {tabName}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

CardNavTabs.propTypes = { cardId: string.isRequired, tabNames: arrayOf(string).isRequired };

export default CardNavTabs;
