import React, { useState, useEffect } from 'react';
import { string, func, shape, number, bool } from 'prop-types';

// localization
import { useTranslation } from 'react-i18next';

import { XIcon } from '@primer/octicons-react';
import TextEditor from '../../TextEditor';

import { EditorCard } from '../../Cards';

const ImageUpload = ({ answerId, imageName, onChange, disabled }) => {
  const { t } = useTranslation(['globals']);

  const [imageUploadLabel, setImageUploadLabel] = useState(
    imageName.substr(imageName.indexOf('-') + 1)
  );

  return (
    <div>
      <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={disabled}
            onClick={() => {
              setImageUploadLabel(t(('globals:select_image', 'Bild auswählen')));
              onChange({
                type: 'removeCardImage',
                payload: { id: answerId }
              });
            }}
          >
            <XIcon />
          </button>
        </div>

        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="imageUpload"
            aria-describedby="imageUploadAddon"
            onChange={(e) => {
              setImageUploadLabel(e.target.files[0].name);
              onChange({
                type: 'changeCardImage',
                payload: {
                  id: answerId,
                  imageData: e.target.files[0],
                  imageURL: URL.createObjectURL(e.target.files[0])
                }
              });
            }}
          />
          <label
            className="custom-file-label"
            htmlFor="imageUpload"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {imageUploadLabel}
          </label>
        </div>
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  answerId: string.isRequired,
  imageName: string,
  onChange: func.isRequired,
  disabled: bool.isRequired
};

ImageUpload.defaultProps = {
  imageName: '...'
};

const CardEditor = ({ index, answerOption, dispatch }) => {
  const { t } = useTranslation(['globals']);

  const tabNames = [t(('globals:text', 'Text')), t(('globals:image', 'Bild'))];

  useEffect(() => {
    dispatch({
      type: 'changeCardIndex',
      payload: { id: answerOption.id, index }
    });
  }, [index]);

  const textTabContent = (
    <TextEditor
      placeholder={t(('globals:title', 'Titel'))}
      value={answerOption.title}
      onChange={(value) => {
        dispatch({
          type: 'changeCardTitle',
          payload: { id: answerOption.id, title: value }
        });
      }}
    />
  );

  const imageTabContent = (
    <ImageUpload
      answerId={answerOption.id}
      imageName={answerOption.imageName}
      onChange={dispatch}
      disabled={answerOption.imageURL === ''}
    />
  );

  const removeCard = () => {
    dispatch({
      type: 'removeCard',
      payload: { id: answerOption.id }
    });
  };

  return (
    <div className="col my-3 px-2">
      <EditorCard
        index={index}
        tabNames={tabNames}
        tabContents={[textTabContent, imageTabContent]}
        removeCard={removeCard}
      />
    </div>
  );
};

CardEditor.propTypes = {
  index: number.isRequired,
  answerOption: shape({
    id: string.isRequired,
    title: string,
    imageName: string
  }).isRequired,
  dispatch: func.isRequired
};

export default CardEditor;
