/* eslint-disable no-unused-vars */
import React from 'react';
import { arrayOf, object, string } from 'prop-types';
import { AmountAnswer } from '../../components/Question';
import pizzaWhole from '../../images/pizza-whole-example.jpg';
import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

const AmountCard = ({ imageURL, title }) => {
  return (
    <div className="card text-center" style={{ minWidth: '270px' }}>
      <img src={imageURL} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
};

AmountCard.propTypes = {
  imageURL: string,
  title: string.isRequired
};

AmountCard.defaultProps = {
  imageURL: ''
};

const AmountCardsDeck = ({ amountCards }) => {
  return amountCards.map((card) => <div className="px-2 align-self-center"> {card} </div>);
};

AmountCardsDeck.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  amountCards: arrayOf(object).isRequired
};

const mockAmountCards = [
  <AmountCard key="1" title="1" />,
  <AmountCard key="2" imageURL={pizzaQuarter} title="2" />,
  <AmountCard key="3" title="3" />,
  <AmountCard key="4" imageURL={pizzaHalf} title="4" />,
  <AmountCard key="5" title="5" />,
  <AmountCard key="6" imageURL={pizzaWhole} title="6" />,
  <AmountCard key="7" title="7" />
];

const AdminPage = () => {
  return (
    <div className="border border-info">
      <AmountAnswer
        title="Rice"
        comment="How large was your portion?"
        help="Please select one picture. You can scroll horizontally."
      />
      <div className="container-fluid px-0">
        <div className="row no-gutters overflow-auto flex-row flex-nowrap text-center my-3">
          <AmountCardsDeck amountCards={mockAmountCards} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
