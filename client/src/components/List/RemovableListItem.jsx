import React from 'react';
import { string, func, bool, oneOfType, element } from 'prop-types';
import DeleteButton from '../Button';

const RemovableListItem = ({ content, isTrashCan, elementToRemove, onClick }) => {
  return (
    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
      <div className="col">{content}</div>
      <div className="col-2 d-flex justify-content-end">
        <DeleteButton isTrashCan={isTrashCan} element={elementToRemove} onClick={onClick} />
      </div>
    </li>
  );
};

RemovableListItem.propTypes = {
  content: oneOfType([string, element]).isRequired,
  isTrashCan: bool,
  elementToRemove: string.isRequired,
  onClick: func.isRequired
};

RemovableListItem.defaultProps = {
  isTrashCan: false
};

export default RemovableListItem;
