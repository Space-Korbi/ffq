import React from 'react';
import { string, func, bool } from 'prop-types';
import DeleteButton from '../Button';

const RemovableListItem = ({ content, isTrashCan, onClick }) => {
  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      {content}
      <DeleteButton isTrashCan={isTrashCan} element={content} onClick={onClick} />
    </li>
  );
};

RemovableListItem.propTypes = {
  content: string.isRequired,
  isTrashCan: bool,
  onClick: func.isRequired
};

RemovableListItem.defaultProps = {
  isTrashCan: false
};

export default RemovableListItem;
