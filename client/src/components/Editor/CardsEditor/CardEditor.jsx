import React, { useState } from 'react';
import { string, func, shape, number, bool } from 'prop-types';

import { XIcon } from '@primer/octicons-react';
import DeleteButton from '../../Button';

const TextEdit = ({ cardId, title, onChange }) => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        aria-label="Title input"
        aria-describedby="title-input"
        value={title}
        placeholder="Card Text"
        onChange={(e) => {
          onChange({ type: 'changeCardTitle', payload: { id: cardId, title: e.target.value } });
        }}
      />
    </div>
  );
};

TextEdit.propTypes = {
  cardId: string.isRequired,
  title: string.isRequired,

  onChange: func.isRequired
};

const ImageUpload = ({ onChange, answerId, disabled }) => {
  const [imageUploadLabel, setImageUploadLabel] = useState('Select Image');

  return (
    <div>
      <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={disabled}
            onClick={() => {
              setImageUploadLabel('Select Image');
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
                payload: { id: answerId, image: e.target.files[0] }
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
  onChange: func.isRequired,
  answerId: string.isRequired,
  disabled: bool.isRequired
};

const CardEditor = ({ id, answer, dispatch }) => {
  return (
    <div className="col my-3">
      <div className="card mx-2">
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            {id}
            <ul className="nav nav-tabs card-header-tabs" id="tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id={`text-tab${id}`}
                  data-toggle="tab"
                  href={`#text${id}`}
                  role="tab"
                  aria-controls={`text${id}`}
                  aria-selected="true"
                >
                  Text
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id={`image-tab${id}`}
                  data-toggle="tab"
                  href={`#image${id}`}
                  role="tab"
                  aria-controls={`image${id}`}
                  aria-selected="false"
                >
                  Image
                </a>
              </li>
            </ul>
            <DeleteButton
              element={answer.title}
              onClick={() =>
                dispatch({
                  type: 'removeCard',
                  payload: { id: answer.id }
                })
              }
            />
          </div>
        </div>
        <div className="row no-gutters">
          {answer.imageURL && (
            <div className="col-2 align-self-center">
              <img src={answer.imageURL} alt="..." style={{ maxWidth: '100%' }} />
            </div>
          )}
          <div className="col align-self-center">
            <div className="card-body px-2">
              <div className="tab-content" id="tab-content">
                <div
                  className="tab-pane fade show active"
                  id={`text${id}`}
                  role="tabpanel"
                  aria-labelledby={`text-tab${id}`}
                >
                  <TextEdit cardId={answer.id} title={answer.title} onChange={dispatch} />
                </div>
                <div
                  className="tab-pane fade "
                  id={`image${id}`}
                  role="tabpanel"
                  aria-labelledby={`image-tab${id}`}
                >
                  <ImageUpload
                    answerId={answer.id}
                    onChange={dispatch}
                    disabled={answer.imageURL === ''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardEditor.propTypes = {
  id: number.isRequired,
  answer: shape({
    id: string.isRequired,
    title: string,
    imageURL: string
  }).isRequired,
  dispatch: func.isRequired
};

export default CardEditor;
