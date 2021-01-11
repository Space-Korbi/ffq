import React from 'react';

// icons
import { HorizontalRuleIcon } from '@primer/octicons-react';

const hasPassed = (date) => {
  if (Date.now() > new Date(date)) {
    return true;
  }
  return false;
};

const isBetween = (startDate, endDate) => {
  const now = Date.now();
  if (now > new Date(startDate) && now < new Date(endDate)) {
    return true;
  }
  return false;
};

const toDateDE = (date) => {
  return new Date(date).toLocaleDateString('de-DE');
};

const applyDateStyle = (date) => {
  if (hasPassed(date)) {
    return (
      <span className="badge badge-success mx-1">{new Date(date).toLocaleDateString('de-DE')}</span>
    );
  }
  return (
    <span className="badge badge-danger mx-1">
      <HorizontalRuleIcon size={13} />
    </span>
  );
};

const dateHelper = {
  toDateDE,
  hasPassed,
  isBetween,
  applyDateStyle
};

export default dateHelper;
