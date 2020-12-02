import React from 'react';
import { string, func } from 'prop-types';
import { X } from 'react-feather';
import DeleteButton from '../Button';

const RemovableListItem = ({ content, Icon, onClick }) => {
  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <p className="text-break">{content}</p>
      <DeleteButton Icon={Icon} element={content} onClick={onClick} />
    </li>
  );
};

RemovableListItem.propTypes = {
  content: string.isRequired,
  Icon: func,
  onClick: func.isRequired
};

RemovableListItem.defaultProps = {
  Icon: X
};

export default RemovableListItem;
