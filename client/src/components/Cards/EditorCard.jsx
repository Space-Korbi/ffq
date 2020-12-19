import React from 'react';
import { arrayOf, number, string, element, func } from 'prop-types';
import { nanoid } from 'nanoid';

import CardTabContents from './CardTabContents';
import CardNavTabs from './CardNavTabs';
import { DeleteButton } from '../Button';

const EditorCard = ({ index, tabNames, tabContents, removeCard }) => {
  const cardId = nanoid();

  return (
    <div className="card mx-2">
      <div className="card-header">
        <div className="d-flex align-items-center">
          {index}
          <CardNavTabs tabNames={tabNames} cardId={cardId} />
          <div className="ml-auto">
            <DeleteButton onClick={() => removeCard()} />
          </div>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col align-self-center">
          <div className="card-body px-2">
            <div className="tab-content" id="tab-content">
              <CardTabContents cardId={cardId} tabNames={tabNames} tabContents={tabContents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditorCard.propTypes = {
  index: number.isRequired,
  tabNames: arrayOf(string).isRequired,
  tabContents: arrayOf(element).isRequired,
  removeCard: func.isRequired
};

export default EditorCard;
