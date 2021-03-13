/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { arrayOf, func, string, shape } from 'prop-types';
import Gallery from 'react-grid-gallery';
import $ from 'jquery';
import { nanoid } from 'nanoid';

// localization
import { useTranslation } from 'react-i18next';

// components
import { ArrowRightIcon, ArrowLeftIcon } from '@primer/octicons-react';

// icons

function QuestionnaireImages({ prevUploads, dispatch }) {
  const { t } = useTranslation(['globals']);

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [currentSrc, setCurrentSrc] = useState('...');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!prevUploads) {
      return;
    }
    setImages(
      prevUploads.map((upload) => {
        if (upload.imageData) {
          return {
            id: upload.id,
            imageData: upload.imageData,
            src: upload.imageURL,
            thumbnail: upload.imageURL,
            thumbnailWidth: 320,
            thumbnailHeight: 210
          };
        }
        return {
          id: upload.id,
          src: upload.imageURL,
          thumbnail: upload.imageURL,
          thumbnailWidth: 320,
          thumbnailHeight: 210
        };
      })
    );
  }, [prevUploads]);

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
    dispatch({
      type: 'removeImage',
      payload: {
        id: images[currentIndex].id
      }
    });
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
    selectedImages.forEach((index) => {
      dispatch({
        type: 'removeImage',
        payload: {
          id: images[index].id
        }
      });
    });

    setImages((prevState) => {
      const remainingImages = prevState.filter((image, index) => !selectedImages.includes(index));
      return remainingImages;
    });
    setCurrentIndex('...');
    setSelectedImages([]);
  };

  const arrayMove = (oldIndex, newIndex) => {
    if (newIndex >= images.length || newIndex < 0) {
      return;
    }

    const newState = [...images];
    newState.splice(newIndex, 0, newState.splice(oldIndex, 1)[0]);
    dispatch({
      type: 'moveImages',
      payload: {
        movedImages: newState
      }
    });

    setSelectedImages([newIndex]);
  };

  return (
    <div className="mt-5">
      <div className="row no-gutters d-flex justify-content-start">
        <div className="col-auto mb-3 mr-3">
          <div className="input-group" style={{ maxWidth: '500px' }}>
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                {t('globals:upload_image', 'Bild hochladen')}
              </span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={(e) => {
                  const image = e.target.files[0];
                  dispatch({
                    type: 'addImage',
                    payload: {
                      id: nanoid(),
                      imageData: image,
                      imageURL: URL.createObjectURL(image)
                    }
                  });
                }}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {t('globals:choose_image', 'Bild auswählen')}
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
              {t('globals:move_image', 'Bild verschieben')}
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
            {t('globals:delete_selected', 'Auswahl löschen')}
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
                {t('globals:preview', 'Vorschau')}
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
                {t('globals:close', 'Schließen')}
              </button>
              <button type="button" className="btn btn-danger" onClick={() => onClickDelete()}>
                {t('globals:delete_image', 'Bild löschen')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

QuestionnaireImages.propTypes = {
  prevUploads: arrayOf(shape({ id: string, imageURL: string })).isRequired,
  dispatch: func.isRequired
};

export default QuestionnaireImages;
