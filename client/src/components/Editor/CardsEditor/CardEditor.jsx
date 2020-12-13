import React, { useState } from 'react';
import { string, func, shape, number } from 'prop-types';

import DeleteButton from '../../Button';

const TextEdit = ({ cardId, title, onChange }) => {
  return (
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          Title
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        value={title}
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

const ImageUpload = ({ onChange, answerId }) => {
  const [imageUploadLabel, setImageUploadLabel] = useState('Image');

  return (
    <div>
      <div className="input-group mb-3">
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
          <label className="custom-file-label" htmlFor="imageUpload">
            {imageUploadLabel}
          </label>
        </div>
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  onChange: func.isRequired,
  answerId: string.isRequired
};

const CardEditor = ({ id, answer, dispatch, removeCard }) => {
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
            <DeleteButton element={answer.title} onClick={() => removeCard(answer.id)} />
          </div>
        </div>
        <div className="row no-gutters">
          {answer.imageURL && (
            <div className="col-4 align-self-center">
              <img
                src={answer.imageURL}
                className={answer.imageURL}
                alt="..."
                style={{ maxWidth: '100%' }}
              />
            </div>
          )}
          <div className="col">
            <div className="card-body">
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
                  <div className="row no-gutters">
                    <div className="col mx-3">
                      <ImageUpload answerId={answer.id} onChange={dispatch} />
                    </div>
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

CardEditor.propTypes = {
  id: number.isRequired,
  answer: shape({
    id: string.isRequired,
    title: string,
    imageURL: string
  }).isRequired,
  dispatch: func.isRequired,
  removeCard: func.isRequired
};

export default CardEditor;
