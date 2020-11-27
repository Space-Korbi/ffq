/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import PropTypes, { number, string, shape } from 'prop-types';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Question = (props) => {
  const { id, labels, images, handleClick, collapsed } = props;

  /*
  useEffect(() => {
    if (data.answered) {
      console.log('ansered!!');
      setCollapsed('collapse show');
      // set Selected
    }
  });
  */

  // eslint-disable-next-line prefer-template
  const divId = '#' + id;

  $(divId).on('click', () => {
    console.log('Hello');
    $('#collapseExample').collapse('show');
  });

  /*
  $("input[type='button']").on('click', () => {
    const radioVal = $("input[name='options']:checked").val();
    console.log('--------------');
    console.log(radioVal);
  });
  */

  const handleThisYo = () => {
    console.log('===');
    $("input[name='options']")
      .off()
      .on('click', (e) => {
        console.log('--------------');
        $('#collapseExample').collapse('show');
        console.log(e);
      });
  };

  /*
  useEffect(() => {
    console.log('data', data);
    if (!data.answered) {
      $('#collapseExample').collapse('hide');
    }
  }, []);
  */

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
            <div className="btn-group btn-group-toggle" data-toggle="buttons" id={divId}>
              <label className="btn btn-outline-primary form-check-label">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency1"
                  autoComplete="off"
                  onClick={(e) => handleClick(e)}
                />
                1x pro Woche
              </label>

              <label className="btn btn-outline-primary">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency2"
                  autoComplete="off"
                  onClick={(e) => handleClick(e)}
                />
                2x pro Woche
              </label>
              <label className="btn btn-outline-primary">
                <input
                  type="radio"
                  name="frequency"
                  id="frequency3"
                  autoComplete="off"
                  onClick={(e) => handleClick(e)}
                />
                3x pro Woche
              </label>
            </div>
          </div>
          <p />
          <div className={collapsed} id="collapseExample">
            <div className="card card-body">
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
  handleClick: PropTypes.func.isRequired,
  collapsed: PropTypes.string.isRequired
};

export default Question;
