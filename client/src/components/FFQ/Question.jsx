import React from 'react';
import PropTypes from 'prop-types';

const Question = (props) => {
  const { questionTitle, questionText, imageLarge, imageMedium, imageSmall } = props;
  return (
    <div className="jumbotron">
      <h1 className="display-4">{questionTitle}</h1>
      <p className="lead">{questionText}</p>
      <hr className="my-4" />
      <p>Select one:</p>
      <div className="card-deck">
        <div className="card">
          <img className="card-img-top" src={imageLarge} alt="Large" />
          <div className="card-body">
            <h5 className="card-title">Large portion</h5>
            <p className="card-text">About 400g</p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src={imageMedium} alt="Medium" />
          <div className="card-body">
            <h5 className="card-title">Medium portion</h5>
            <p className="card-text">About 200g </p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src={imageSmall} alt="Small" />
          <div className="card-body">
            <h5 className="card-title">Small portion</h5>
            <p className="card-text">About 100g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  questionTitle: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  imageLarge: PropTypes.string.isRequired,
  imageMedium: PropTypes.string.isRequired,
  imageSmall: PropTypes.string.isRequired
};

export default Question;
