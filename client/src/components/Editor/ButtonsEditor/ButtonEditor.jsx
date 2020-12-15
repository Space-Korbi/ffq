import React from 'react';
import { arrayOf, func, string, shape, exact, number } from 'prop-types';

import TextEditor from '../../TextEditor';
import DeleteButton from '../../Button';

const ButtonEditor = ({ dispatch, position, answerOption, index }) => {
  return (
    <div className="col my-3">
      <div className="card mx-2">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <div>{index}</div>
            <ul className="nav nav-tabs card-header-tabs ml-4" id="tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id={`text-tab${answerOption.id}`}
                  data-toggle="tab"
                  href={`#text${answerOption.id}`}
                  role="tab"
                  aria-controls={`text${answerOption.id}`}
                  aria-selected="true"
                >
                  Text
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id={`image-tab${answerOption.id}`}
                  data-toggle="tab"
                  href={`#image${answerOption.id}`}
                  role="tab"
                  aria-controls={`image${answerOption.id}`}
                  aria-selected="false"
                >
                  Action
                </a>
              </li>
            </ul>
            <div className="ml-auto">
              <DeleteButton
                element={answerOption.title}
                onClick={() =>
                  dispatch({
                    type: 'removeButton',
                    payload: { id: answerOption.id, position }
                  })
                }
              />
            </div>
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
                  id={`text${answerOption.id}`}
                  role="tabpanel"
                  aria-labelledby={`text-tab${answerOption.id}`}
                >
                  <TextEditor
                    title={answerOption.title}
                    onChange={(value) => {
                      dispatch({
                        type: 'changeButtonTitle',
                        payload: { id: answerOption.id, position, title: value }
                      });
                    }}
                  />
                </div>
                <div
                  className="tab-pane fade "
                  id={`image${answerOption.id}`}
                  role="tabpanel"
                  aria-labelledby={`image-tab${answerOption.id}`}
                >
                  <div className="input-group input-group-sm flex-nowrap">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-sm">
                        Skip
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="inputGroup-sizing-sm">
                        Questions
                      </span>
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

ButtonEditor.propTypes = {
  answerOption: shape({
    type: string,
    options: shape({
      left: arrayOf(exact({ id: string.isRequired, title: string })),
      right: arrayOf(exact({ id: string.isRequired, title: string }))
    })
  }).isRequired,
  dispatch: func.isRequired,
  position: string.isRequired,
  index: number.isRequired
};

export default ButtonEditor;
