import React from 'react';
import { arrayOf, object, string } from 'prop-types';
import Jumbotron from '../Jumbotron';
import Help from '../Help';

import pizzaWhole from '../../../images/pizza-whole-example.jpg';
import pizzaHalf from '../../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../../images/pizza-quarter-example.jpg';

const AmountCard = ({ image, title, subtitle }) => {
  return (
    <div className="card text-center" style={{ minWidth: '270px' }}>
      <img src={image} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subtitle}</p>
      </div>
    </div>
  );
};

AmountCard.propTypes = {
  image: string,
  title: string.isRequired,
  subtitle: string.isRequired
};

AmountCard.defaultProps = {
  image: ''
};

const AmountCardsDeck = ({ amountCards }) => {
  return amountCards.map((card, index) => {
    switch (index) {
      case 0:
        return <div className="pl-5 pr-2 align-self-center"> {card} </div>;
      case amountCards.length - 1:
        return <div className="pl-2 pr-5 align-self-center"> {card} </div>;
      default:
        return <div className="px-2 align-self-center"> {card} </div>;
    }
  });
};

AmountCardsDeck.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  amountCards: arrayOf(object).isRequired
};

const mockAmountCards = [
  <AmountCard key="1" title="1" subtitle="1.1" />,
  <AmountCard key="2" image={pizzaQuarter} title="2" subtitle="2.1" />,
  <AmountCard key="3" title="3" subtitle="3.1" />,
  <AmountCard key="4" image={pizzaHalf} title="4" subtitle="4.1" />,
  <AmountCard key="5" title="5" subtitle="5.1" />,
  <AmountCard key="6" image={pizzaWhole} title="6" subtitle="6.1" />,
  <AmountCard key="7" title="7" subtitle="7.1" />
];

const AmountQuestion = ({ title, subtitle, comment, help }) => {
  return (
    <div>
      <div className="">
        <Jumbotron title={title} subtitle={subtitle} comment={comment} />
      </div>
      <div className="row no-gutters">
        <div className="col d-flex justify-content-end">
          <Help infoText={help} />
        </div>
        <div className="container-fluid px-0">
          <div className="row no-gutters overflow-auto flex-row flex-nowrap text-center my-3">
            <AmountCardsDeck amountCards={mockAmountCards} />
          </div>
        </div>
      </div>
    </div>
  );
};

AmountQuestion.propTypes = {
  title: string,
  subtitle: string,
  comment: string,
  help: string
};

AmountQuestion.defaultProps = {
  title: '',
  subtitle: '',
  comment: '',
  help: ''
};

export default AmountQuestion;
