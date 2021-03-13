import React from 'react';
import { arrayOf, func, string } from 'prop-types';

const CardNavTabs = ({ cardId, tabNames, selectedTab, setSelectedTab }) => {
  return (
    <>
      <ul
        className="nav text-nowrap flex-row d-flex justify-content-around"
        id="tab"
        role="tablist"
      >
        {tabNames.map((tabName, tabIndex) => {
          const tabNameLowerCase = tabName.toLowerCase();
          return (
            <li className="nav-item" key={tabName + cardId}>
              <a
                className={
                  tabNameLowerCase === selectedTab ? 'nav-link active p-1' : 'nav-link p-1'
                }
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
