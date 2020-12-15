/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { func, string } from 'prop-types';

function AnswerCard({ title, imageURL, onClick }) {
  return (
    <div
      className="card my-5 align-items-center d-flex justify-content-center"
      style={{ minWidth: '270px', maxWidth: '350px', minHeight: '200px' }}
    >
      {imageURL ? (
        <img src={imageURL} className="card-img-top" alt="..." />
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
