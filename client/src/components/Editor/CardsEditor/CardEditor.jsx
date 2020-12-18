import React, { useState } from 'react';
import { string, func, shape, number, bool } from 'prop-types';

import { XIcon } from '@primer/octicons-react';
import DeleteButton from '../../Button';
import TextEditor from '../../TextEditor';

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
  onChange: func.isRequired,
  answerId: string.isRequired,
  disabled: bool.isRequired
};

const CardEditor = ({ id, answerOption, dispatch }) => {
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
              element={answerOption.title}
              onClick={() =>
                dispatch({
                  type: 'removeCard',
                  payload: { id: answerOption.id }
                })
              }
            />
          </div>
        </div>
        <div className="row no-gutters">
          {answerOption.imageURL && (
            <div className="col-2 align-self-center">
              <img src={answerOption.imageURL} alt="..." style={{ maxWidth: '100%' }} />
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
                  <TextEditor
                    placeholder="Card Title"
                    onChange={(value) => {
                      dispatch({
                        type: 'changeCardTitle',
                        payload: { id: answerOption.id, title: value }
                      });
                    }}
                  />
                </div>
                <div
                  className="tab-pane fade "
                  id={`image${id}`}
                  role="tabpanel"
                  aria-labelledby={`image-tab${id}`}
                >
                  <ImageUpload
                    answerId={answerOption.id}
                    onChange={dispatch}
                    disabled={answerOption.imageURL === ''}
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
  answerOption: shape({
    id: string.isRequired,
    title: string,
    imageName: string
  }).isRequired,
  dispatch: func.isRequired
};

export default CardEditor;
