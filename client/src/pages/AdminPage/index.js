/* eslint-disable no-unused-vars */
import React from 'react';
import { arrayOf, object, string } from 'prop-types';
import { AmountAnswer } from '../../components/Question';
import pizzaWhole from '../../images/pizza-whole-example.jpg';
import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

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
  return amountCards.map((card) => <div className="px-2 align-self-center"> {card} </div>);
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
