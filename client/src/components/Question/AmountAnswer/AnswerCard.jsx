/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { func, string } from 'prop-types';

function AnswerCard({ title, imageURL, onClick }) {
  return (
    <div
      className="card my-5 align-items-center d-flex justify-content-center"
      style={{ minWidth: '270px', maxWidth: '300px', minHeight: '270px', maxHeight: '300px' }}
    >
      {imageURL ? (
        <div className="row no-gutters">
          <img
            src={imageURL}
            className="card-img-top"
            alt="..."
            style={{ objectFit: 'contain', maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      ) : (
        <div className="card-body align-items-center d-flex justify-content-center">
          <div>
            <h5 className="card-title">{title}</h5>
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
  onClick: func.isRequired
};

AnswerCard.defaultProps = {
  title: '',
  imageURL: ''
};

AnswerCard.propTypes = {};

export default AnswerCard;
