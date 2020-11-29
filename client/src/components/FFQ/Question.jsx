import React, { useState, useEffect } from 'react';
import PropTypes, { number, string, shape } from 'prop-types';

const Question = (props) => {
  const { id, labels, images, handleClick, collapsed, getAnswers } = props;
  const [frequencyAnswer, setFrequencyAnswer] = useState(null);

  useEffect(() => {
    setFrequencyAnswer(getAnswers(id));
  }, []);

  const handleChange = (e) => {
    handleClick(e, id);
    setFrequencyAnswer(e.target.value);
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
          <div>
            <div className="" data-toggle="" id={id}>
              <label className=" form-check-label">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency1"
                  value="1xWeek"
                  checked={frequencyAnswer === '1xWeek'}
                  onChange={(e) => handleChange(e)}
                />
                1x pro Woche
              </label>

              <label className="form-check-label">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency2"
                  value="2xWeek"
                  checked={frequencyAnswer === '2xWeek'}
                  onChange={(e) => handleChange(e)}
                />
                2x pro Woche
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency3"
                  value="3xWeek"
                  checked={frequencyAnswer === '3xWeek'}
                  onChange={(e) => handleChange(e)}
                />
                3x pro Woche
              </label>
            </div>
          </div>
          <p />
          <div className={collapsed} id="collapseExample">
            <div className="card-deck">
              <div className="card">
                <img className="card-img-top" src={images.imageSmall} alt="Small" />
                <div className="card-body">
                  <h5 className="card-title">Small portion</h5>
                  <p className="card-text">About 100g</p>
                </div>
              </div>
              <div className="card">
                <img className="card-img-top" src={images.imageMedium} alt="Medium" />
                <div className="card-body">
                  <h5 className="card-title">Medium portion</h5>
                  <p className="card-text">About 200g </p>
                </div>
              </div>
              <div className="card">
                <img className="card-img-top" src={images.imageLarge} alt="Large" />
                <div className="card-body">
                  <h5 className="card-title">Large portion</h5>
                  <p className="card-text">About 400g</p>
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
  collapsed: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  getAnswers: PropTypes.func.isRequired
};

export default Question;
