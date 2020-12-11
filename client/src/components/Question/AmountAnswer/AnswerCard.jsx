/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { func, string } from 'prop-types';

function AnswerCard({ title, subtitle, imageURL, onClick }) {
  return (
    <div className="card my-5" style={{ minWidth: '270px', minHeight: '250px' }}>
      {imageURL ? (
        <img src={imageURL} className="card-img-top" alt="..." />
      ) : (
        <div className="card-body align-items-center d-flex justify-content-center">
          <div>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{subtitle}</p>
          </div>
        </div>
      )}
      <a href="#" className="stretched-link" onClick={onClick}>
        {' '}
      </a>
    </div>
  );
}

AnswerCard.propTypes = {
  imageURL: string,
  title: string,
  subtitle: string,
  onClick: func.isRequired
};

AnswerCard.defaultProps = {
  title: '',
  subtitle: '',
  imageURL: ''
};

AnswerCard.propTypes = {};

export default AnswerCard;
