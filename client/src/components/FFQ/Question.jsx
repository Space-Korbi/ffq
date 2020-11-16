/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Question = (props) => {
  const { questionHeadline, questionText, imageLarge, imageMedium, imageSmall } = props;
  return (
    <div className="jumbotron">
      <h1 className="display-4">{questionHeadline}</h1>
      <p className="lead">{questionText}</p>
      <hr className="my-4" />
      <p>Select one:</p>
      <div className="card-deck">
        <div className="card">
          <img className="card-img-top" src={imageLarge} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Large portion</h5>
            <p className="card-text">About 400g</p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src={imageMedium} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Medium portion</h5>
            <p className="card-text">About 200g </p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src={imageSmall} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Small portion</h5>
            <p className="card-text">About 100g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
