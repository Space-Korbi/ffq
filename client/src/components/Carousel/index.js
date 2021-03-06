import React, { useState, useEffect } from 'react';
import { string, arrayOf } from 'prop-types';
import $ from 'jquery';

const Carousel = ({ imageURLs }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  console.log(imageURLs);
  useEffect(() => {
    $('.carousel').carousel('pause');
  }, []);

  return (
    <div>
      <nav className="navbar bg-light  fixed-top text-white" style={{ height: '80px' }} />
      <div className="container mt-3">
        <div id="carouselExampleControls" className="carousel slide">
          <div className="carousel-inner">
            {imageURLs.map((url, index) => {
              return (
                <div
                  key={url}
                  className={`carousel-item ${index === 0 && 'active'}`}
                  data-interval=""
                >
                  <img
                    src={url}
                    className="d-block mx-auto"
                    alt="..."
                    style={{ maxHeight: '800px', maxWidth: '100%' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container fixed-bottom mb-5">
        <div className="row no-gutters flex-row w-100">
          <div className="col d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-lg btn-primary"
              onClick={() => {
                if (currentIndex === 1) {
                  console.log('prev');
                } else {
                  setCurrentIndex((prevState) => prevState - 1);
                  $('.carousel').carousel('prev');
                }
              }}
            >
              Back
            </button>
            <div className="pl-2" />
            <h5>{`Teil ${currentIndex} von ${imageURLs.length}`}</h5>
            <div className="pl-2" />
            <button
              type="button"
              className="btn btn-lg btn-primary"
              onClick={() => {
                if (currentIndex >= imageURLs.length) {
                  console.log('next');
                } else {
                  setCurrentIndex((prevState) => prevState + 1);
                  $('.carousel').carousel('next');
                }
              }}
            >
              {currentIndex >= imageURLs.length ? 'To the questions' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  imageURLs: arrayOf(string).isRequired
};

export default Carousel;
