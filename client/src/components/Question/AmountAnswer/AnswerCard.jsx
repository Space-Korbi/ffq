/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { func, string } from 'prop-types';

function AnswerCard({ imageURL, title, subtitle, onClick }) {
  return (
    <div className="card text-center" style={{ minWidth: '270px' }}>
      <img src={imageURL} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subtitle}</p>
      </div>
      <a href="#" className="stretched-link" onClick={onClick}>
        {' '}
      </a>
    </div>
  );
}

AnswerCard.propTypes = {
  imageURL: string,
  title: string.isRequired,
  subtitle: string.isRequired,
  onClick: func.isRequired
};

AnswerCard.defaultProps = {
  imageURL: ''
};

AnswerCard.propTypes = {};

export default AnswerCard;
