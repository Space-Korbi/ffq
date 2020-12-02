import React from 'react';
import { string, func, object, oneOfType } from 'prop-types';
import { X } from 'react-feather';
import DeleteButton from '../Button';

const RemovableListItem = ({ content, Icon, onClick }) => {
  return (
    <li className="list-group-item d-flex align-items-center justify-content-between text-break">
      {content}
      <DeleteButton Icon={Icon} element={content} onClick={onClick} />
    </li>
  );
};

RemovableListItem.propTypes = {
  content: string.isRequired,
  Icon: oneOfType([string, object]),
  onClick: func.isRequired
};

RemovableListItem.defaultProps = {
  Icon: X
};

export default RemovableListItem;
