/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { func, string } from 'prop-types';

function AnswerCard({ title, imageURL, imageName, onClick }) {
  const [currentURL, setCurrentURL] = useState(`http://localhost:3000/${imageName}`);
  /**
   * TODO
   * change hardcoded URL path value and make url global constant
   * <img src={`http://localhost:3000/${imageName}`}
   */
  useEffect(() => {
    if (imageURL) {
      setCurrentURL(imageURL);
    }
  }, [imageURL]);

  return (
    <div
      className="card my-5 align-items-center d-flex justify-content-center"
      style={{ minWidth: '270px', maxWidth: '300px', minHeight: '270px', maxHeight: '300px' }}
    >
      {imageName || imageURL ? (
        <div className="row no-gutters">
          <img
            src={currentURL}
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
      <button type="button" className="bg-transparent stretched-link" onClick={onClick}>
        {' '}
      </button>
    </div>
  );
}

AnswerCard.propTypes = {
  title: string,
  imageURL: string,
  imageName: string,
  onClick: func.isRequired
};

AnswerCard.defaultProps = {
  title: '',
  imageURL: '',
  imageName: ''
};

AnswerCard.propTypes = {};

export default AnswerCard;
