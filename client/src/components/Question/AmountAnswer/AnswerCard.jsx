/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { bool, func, string } from 'prop-types';

function AnswerCard({ title, imageURL, imageName, isSelectedAnswer, onClick }) {
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

  let cardStyle = 'card my-3 align-items-center d-flex justify-content-center';
  if (isSelectedAnswer) {
    cardStyle = 'card my-3 align-items-center border-success d-flex justify-content-center';
  }

  return (
    <div className={cardStyle} style={{ minWidth: '270px', maxWidth: '300px', height: '18rem' }}>
      {imageName || imageURL ? (
        <img
          src={currentURL}
          className="card-img-top"
          alt="..."
          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
        />
      ) : (
        <div className="card-body align-items-center d-flex justify-content-center">
          <div>
            <h5 className="card-title">{title}</h5>
          </div>
        </div>
      )}
      {/* Stretch invisible button over the card to make it clickable */}
      <button type="button" className="p-0 m-0 border-0 stretched-link" onClick={onClick}>
        {' '}
      </button>
    </div>
  );
}

AnswerCard.propTypes = {
  title: string,
  imageURL: string,
  imageName: string,
  isSelectedAnswer: bool.isRequired,
  onClick: func.isRequired
};

AnswerCard.defaultProps = {
  title: '',
  imageURL: '',
  imageName: ''
};

AnswerCard.propTypes = {};

export default AnswerCard;
