import React, { useState, useEffect, useRef } from 'react';
import { string, arrayOf, func } from 'prop-types';
import $ from 'jquery';
import { useTranslation } from 'react-i18next';

const Carousel = ({ imageURLs, onSubmitAnswer }) => {
  const { t } = useTranslation(['globals']);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  const indexRef = useRef(currentIndex);

  useEffect(() => {
    $('.carousel').carousel('pause');
  }, []);

  useEffect(() => {
    if (currentIndex > indexRef.current) {
      $('.carousel').carousel('next');
    } else if (currentIndex < indexRef.current) {
      $('.carousel').carousel('prev');
    }

    $('.carousel').on('slid.bs.carousel', () => {
      setTransitioning(false);
      indexRef.current = currentIndex;
    });
  }, [currentIndex]);

  return (
    <div>
      <nav className="navbar bg-light  fixed-top text-white" style={{ height: '98px' }}>
        <div className="row no-gutters flex-row w-100">
          <div className="col d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-primary"
              disabled={transitioning || currentIndex <= 1}
              onClick={() => {
                setTransitioning(true);
                setCurrentIndex((prevState) => prevState - 1);
              }}
            >
              {t(('globals:back', 'Zurück'))}
            </button>
            <div className="pl-2" />
            <h5 className="text-dark">{`Teil ${currentIndex} von ${imageURLs.length}`}</h5>
            <div className="pl-2" />
            <button
              type="button"
              className="btn btn-primary"
              disabled={transitioning}
              onClick={() => {
                setTransitioning(true);
                if (currentIndex >= imageURLs.length) {
                  onSubmitAnswer();
                } else {
                  setCurrentIndex((prevState) => prevState + 1);
                }
              }}
            >
              {currentIndex >= imageURLs.length
                ? t(('globals:to_the_questions', 'Zu den Fragen'))
                : t(('globals:continue', 'Weiter'))}
            </button>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div id="carouselExampleControls" className="carousel slide">
          <div className="carousel-inner">
            {imageURLs.map((url, index) => {
              return (
                <div
                  key={url}
                  className={`carousel-item ${index === 0 && 'active'}`}
                  data-interval=""
                >
                  <img src={url} className="d-block mx-auto my-auto w-100" alt="..." />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  imageURLs: arrayOf(string).isRequired,
  onSubmitAnswer: func.isRequired
};

export default Carousel;
