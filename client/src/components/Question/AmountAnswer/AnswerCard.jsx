import React from 'react';
import { string } from 'prop-types';

function AnswerCard({ imageURL, title, subtitle }) {
  return (
    <div className="card text-center" style={{ minWidth: '270px' }}>
      <img src={imageURL} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subtitle}</p>
      </div>
    </div>
  );
}

AnswerCard.propTypes = {
  imageURL: string,
  title: string.isRequired,
  subtitle: string.isRequired
};

AnswerCard.defaultProps = {
  imageURL: ''
};

AnswerCard.propTypes = {};

export default AnswerCard;
