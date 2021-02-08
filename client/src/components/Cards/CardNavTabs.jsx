import React from 'react';
import { arrayOf, func, string } from 'prop-types';

const CardNavTabs = ({ cardId, tabNames, selectedTab, setSelectedTab }) => {
  return (
    <>
      <ul className="nav nav-tabs card-header-tabs card-header-tabs  ml-4" id="tab" role="tablist">
        {tabNames.map((tabName, tabIndex) => {
          const tabNameLowerCase = tabName.toLowerCase();
          return (
            <li key={tabName + cardId} className="nav-item">
              <a
                className={tabNameLowerCase === selectedTab ? 'nav-link active' : 'nav-link'}
                id={`${tabNameLowerCase}-tab${cardId}`}
                data-toggle="tab"
                href={`#${tabNameLowerCase}${cardId}`}
                role="tab"
                aria-controls={`${tabNameLowerCase}${cardId}`}
                aria-selected={tabIndex === 0 ? 'true' : 'false'}
                onClick={() => setSelectedTab(tabNameLowerCase)}
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

CardNavTabs.propTypes = {
  cardId: string.isRequired,
  tabNames: arrayOf(string).isRequired,
  selectedTab: string.isRequired,
  setSelectedTab: func.isRequired
};

export default CardNavTabs;
