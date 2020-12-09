import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

const AmountCard = ({ imageURL, title, subtitle }) => {
  return (
    <div className="card text-center" style={{ minWidth: '270px' }}>
      <img src={imageURL} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subtitle}</p>
      </div>
    </div>
  );
};

AmountCard.propTypes = {
  imageURL: string,
  title: string.isRequired,
  subtitle: string.isRequired
};

AmountCard.defaultProps = {
  imageURL: ''
};

const AmountCardsDeck = ({ amountCards }) => {
  return amountCards.map((card, index) => {
    switch (index) {
      case 0:
        return (
          <div key={card.key} className="pl-5 pr-2 align-self-center">
            <AmountCard title={card.title} subtitle={card.subtitle} imageURL={card.imageURL} />
          </div>
        );
      case amountCards.length - 1:
        return (
          <div key={card.key} className="pl-2 pr-5 align-self-center">
            <AmountCard title={card.title} subtitle={card.subtitle} imageURL={card.imageURL} />
          </div>
        );
      default:
        return (
          <div key={card.key} className="px-2 align-self-center">
            <AmountCard title={card.title} subtitle={card.subtitle} imageURL={card.imageURL} />
          </div>
        );
    }
  });
};

AmountCardsDeck.propTypes = {
  amountCards: arrayOf(
    shape({
      key: string.isRequired,
      title: string,
      subtitle: string,
      imageURL: string
    })
  ).isRequired
};

const AmountAnswer = ({ amountCards }) => {
  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row no-gutters overflow-auto flex-row flex-nowrap text-center my-3">
          <AmountCardsDeck amountCards={amountCards} />
        </div>
      </div>
    </div>
  );
};

AmountAnswer.propTypes = {
  amountCards: arrayOf(
    shape({
      key: string.isRequired,
      title: string.isRequired,
      subtitle1: string,
      imageURL: string
    })
  ).isRequired
};

export default AmountAnswer;
