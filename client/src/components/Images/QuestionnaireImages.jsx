/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';
import $ from 'jquery';

// components
import { ArrowRightIcon, ArrowLeftIcon } from '@primer/octicons-react';

// icons

const IMAGES = [
  {
    src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
    thumbnail: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 210,
    isSelected: false,
    caption: 'After Rain (Jeshu John - designerspics.com)'
  },
  {
    src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    thumbnail: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: 'Ocean', title: 'Ocean' },
      { value: 'People', title: 'People' }
    ],
    caption: 'Boats (Jeshu John - designerspics.com)'
  },

  {
    src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
    thumbnail: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 212
  }
];

function QuestionnaireImages(props) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [currentSrc, setCurrentSrc] = useState('...');
  const [images, setImages] = useState(IMAGES);

  useEffect(() => {
    if (images[currentIndex]) {
      setCurrentSrc(images[currentIndex].src);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentSrc === '...') {
      return;
    }
    $('#exampleModal').modal('toggle');
  }, [currentSrc]);

  const onSelectImage = (index, image) => {
    const img = images[index];
    if (Object.prototype.hasOwnProperty.call(img, 'isSelected')) {
      img.isSelected = !img.isSelected;
    } else {
      img.isSelected = true;
    }

    if (img.isSelected) {
      setSelectedImages((prevState) => [...prevState, index]);
    } else {
      setSelectedImages((prevState) => prevState.filter((prevSelected) => prevSelected !== index));
    }
  };

  const onClickDelete = () => {
    $('#exampleModal').modal('toggle');
    setCurrentIndex('...');
    setImages((prevState) => {
      const remainingImages = [...prevState];
      remainingImages.splice(currentIndex, 1);
      return remainingImages;
    });
    if (selectedImages.includes(currentIndex)) {
      setSelectedImages((prevState) =>
        prevState.filter((prevSelected) => prevSelected !== currentIndex)
      );
    }
  };

  const deleteSelected = () => {
    setImages((prevState) => {
      const remainingImages = prevState.filter((image, index) => !selectedImages.includes(index));
      return remainingImages;
    });
    setSelectedImages([]);
  };

  const arrayMove = (oldIndex, newIndex) => {
    if (newIndex >= images.length || newIndex < 0) {
      return;
    }
    setImages((prevState) => {
      const newState = [...prevState];
      newState.splice(newIndex, 0, newState.splice(oldIndex, 1)[0]);
      console.log('------', newState);
      return newState;
    });
    setSelectedImages([newIndex]);
  };

  console.log('selected ', selectedImages);

  return (
    <div>
      <p className="lead mb-5 mt-3">
        Images will be presented to the user before the questionnaire is started.
      </p>

      <div className="row no-gutters d-flex justify-content-start">
        <div className="col-auto mb-3 mr-3">
          <div className="input-group" style={{ maxWidth: '500px' }}>
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Upload image
              </span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                Choose file
              </label>
            </div>
          </div>
        </div>
        <div className="col-auto mb-3 mr-3">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => arrayMove(selectedImages[0], selectedImages[0] - 1)}
              disabled={selectedImages.length !== 1}
            >
              <ArrowLeftIcon size={24} />
            </button>

            <button
              type="button"
              className="btn btn-outline-primary text-primary"
              disabled={selectedImages.length !== 1}
              style={{ pointerEvents: 'none' }}
            >
              Move image
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => arrayMove(selectedImages[0], selectedImages[0] + 1)}
              disabled={selectedImages.length !== 1}
            >
              <ArrowRightIcon size={24} />
            </button>
          </div>
        </div>
        <div className="col-auto mb-3 my">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => deleteSelected()}
            disabled={!selectedImages.length}
          >
            Delete selected
          </button>
        </div>
      </div>

      <Gallery
        images={images}
        enableImageSelection
        enableLightbox={false}
        onSelectImage={(index, image) => onSelectImage(index, image)}
        onClickThumbnail={(index) => {
          if (currentIndex === index) {
            $('#exampleModal').modal('toggle');
          } else {
            setCurrentIndex(index);
          }
        }}
      />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Image
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center px-1">
              <img src={currentSrc} className="img-fluid" alt="..." />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-danger" onClick={() => onClickDelete()}>
                Delete image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

QuestionnaireImages.propTypes = {};

export default QuestionnaireImages;
