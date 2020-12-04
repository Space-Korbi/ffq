import React from 'react';
import { string, func, bool } from 'prop-types';
import DeleteButton from '../Button';

const RemovableListItem = ({ content, trashCan, onClick }) => {
  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      {content}
      <DeleteButton trashCan={trashCan} element={content} onClick={onClick} />
    </li>
  );
};

RemovableListItem.propTypes = {
  content: string.isRequired,
  trashCan: bool,
  onClick: func.isRequired
};

RemovableListItem.defaultProps = {
  trashCan: false
};

export default RemovableListItem;
