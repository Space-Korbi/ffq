import React, { useState, useEffect } from 'react';
import PropTypes, { number, string, shape } from 'prop-types';

const Question = (props) => {
  const { id, labels, images, handleChange, collapsed, getAnswers, markAsAnswered } = props;
  const [frequencyAnswer, setFrequencyAnswer] = useState(getAnswers(id).frequency);
  const [amountAnswer, setAmountAnswer] = useState(getAnswers(id).amount);

  useEffect(() => {
    if (
      Object.values(frequencyAnswer).includes(true) &&
      frequencyAnswer !== getAnswers(id).frequency
    ) {
      handleChange(frequencyAnswer, 'frequency', id);
    }
  }, [frequencyAnswer]);

  useEffect(() => {
    if (Object.values(amountAnswer).includes(true) && amountAnswer !== getAnswers(id).amount) {
      handleChange(amountAnswer, 'amount', id);
      markAsAnswered();
    }
  }, [amountAnswer]);

  const handleFrequencyChange = (e) => {
    let updatedAnswer = {};
    const { value } = e.target;
    if (getAnswers(id).frequency[value]) {
      return;
    }
    setFrequencyAnswer((prevState) => {
      updatedAnswer = { ...prevState };
      Object.keys(frequencyAnswer).forEach((key) => {
        if (key === value) {
          updatedAnswer[key] = true;
        } else {
          updatedAnswer[key] = false;
        }
      });
      return updatedAnswer;
    });
  };

  const handleAmountChange = (e) => {
    let updatedAnswer = {};
    const { value } = e.target;
    if (getAnswers(id).frequency[value]) {
      return;
    }
    setAmountAnswer((prevState) => {
      updatedAnswer = { ...prevState };
      Object.keys(amountAnswer).forEach((key) => {
        if (key === value) {
          updatedAnswer[key] = true;
        } else {
          updatedAnswer[key] = false;
        }
      });
      return updatedAnswer;
    });
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">{labels.category}</div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">{labels.subcategory}</h6>
          <p className="card-text">
            {labels.title}: {labels.text}
          </p>
          <div className="col d-flex justify-content-center">
            <div className="mx-auto">
              <button
                type="button"
                name="frequnecy"
                id="frequency1"
                value="x1"
                className={
                  frequencyAnswer.x1 ? 'btn btn-success mx-3' : 'btn btn-outline-primary  mx-3'
                }
                onClick={(e) => handleFrequencyChange(e)}
                aria-expanded={!collapsed}
                aria-controls="collapseAmountSelection"
              >
                1x pro Woche
              </button>
              <button
                type="button"
                name="frequnecy"
                id="frequency1"
                value="x2"
                className={
                  frequencyAnswer.x2 ? 'btn btn-success mx-3' : 'btn btn-outline-primary  mx-3'
                }
                onClick={(e) => handleFrequencyChange(e)}
                aria-expanded={!collapsed}
                aria-controls="collapseAmountSelection"
              >
                2x pro Woche
              </button>
              <button
                type="button"
                name="frequnecy"
                id="frequency1"
                value="x3"
                className={
                  frequencyAnswer.x3 ? 'btn btn-success mx-3' : 'btn btn-outline-primary  mx-3'
                }
                onClick={(e) => handleFrequencyChange(e)}
                aria-expanded={!collapsed}
                aria-controls="collapseAmountSelection"
              >
                3x pro Woche
              </button>
            </div>
          </div>
          <p />
          <div className={collapsed ? 'collapse' : 'collapse.show'} id="collapseAmountSelection">
            <div className="col d-flex justify-content-center">
              <div className="card-deck ">
                <div
                  className={
                    amountAnswer.small
                      ? 'card text-white bg-success border-success mb-3'
                      : 'card mb-3'
                  }
                  style={{ maxWidth: '12rem' }}
                >
                  <img className="card-img-top" src={images.small} alt="Small" />
                  <div className="card-body">
                    <h5 className="card-title">Small portion</h5>
                    <p className="card-text">About 100g</p>
                    <button
                      type="button"
                      name="amount"
                      id="amount1"
                      value="small"
                      className="btn stretched-link"
                      onClick={(e) => handleAmountChange(e)}
                    >
                      {}
                    </button>
                  </div>
                </div>
                <div
                  className={
                    amountAnswer.medium
                      ? 'card text-white bg-success border-success mb-3'
                      : 'card mb-3'
                  }
                  style={{ maxWidth: '12rem' }}
                >
                  <img className="card-img-top" src={images.medium} alt="Medium" />
                  <div className="card-body">
                    <h5 className="card-title">Medium portion</h5>
                    <p className="card-text">About 200g </p>
                    <button
                      type="button"
                      name="amount"
                      id="amount2"
                      value="medium"
                      className="btn stretched-link"
                      onClick={(e) => handleAmountChange(e)}
                    >
                      {}
                    </button>
                  </div>
                </div>
                <div
                  className={
                    amountAnswer.large
                      ? 'card text-white bg-success border-success mb-3'
                      : 'card mb-3'
                  }
                  style={{ maxWidth: '12rem' }}
                >
                  <img className="card-img-top" src={images.large} alt="Large" />
                  <div className="card-body">
                    <h5 className="card-title">Large portion</h5>
                    <p className="card-text">About 400g</p>
                    <button
                      type="button"
                      name="amount"
                      id="amount3"
                      value="large"
                      className="btn stretched-link"
                      onClick={(e) => handleAmountChange(e)}
                    >
                      {}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  id: number.isRequired,
  labels: PropTypes.shape({
    title: string,
    text: string,
    category: string,
    subcategory: string
  }).isRequired,
  images: shape({ small: null, medium: null, large: null }).isRequired,
  collapsed: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  getAnswers: PropTypes.func.isRequired,
  markAsAnswered: PropTypes.func.isRequired
};

export default Question;
