import React from 'react';
import { bool, func, number, shape, string } from 'prop-types';

import DeleteButton from '../../Button';
import TextEditor from '../../TextEditor';

const InputEditorCard = ({ id, answerOption, dispatch }) => {
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
                  id={`userInput-tab${id}`}
                  data-toggle="tab"
                  href={`#userInput${id}`}
                  role="tab"
                  aria-controls={`userInput${id}`}
                  aria-selected="true"
                >
                  Main
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id={`numberInput-tab${id}`}
                  data-toggle="tab"
                  href={`#numberInput${id}`}
                  role="tab"
                  aria-controls={`numberInput${id}`}
                  aria-selected="false"
                >
                  Optional
                </a>
              </li>
            </ul>
            <DeleteButton
              onClick={() =>
                dispatch({
                  type: 'removeTextInput',
                  payload: { id: answerOption.id }
                })
              }
            />
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col align-self-center">
            <div className="card-body px-2">
              <div className="tab-content" id="tab-content">
                <div
                  className="tab-pane fade show active"
                  id={`userInput${id}`}
                  role="tabpanel"
                  aria-labelledby={`userInput-tab${id}`}
                >
                  <TextEditor
                    placeholder="Text Input Title"
                    onChange={(value) => {
                      dispatch({
                        type: 'changeTextInputTitle',
                        payload: { id: answerOption.id, title: value }
                      });
                    }}
                  />
                </div>
                <div
                  className="tab-pane fade "
                  id={`numberInput${id}`}
                  role="tabpanel"
                  aria-labelledby={`numberInput-tab${id}`}
                >
                  {answerOption.hasNumberInput ? (
                    <div className="d-flex">
                      <TextEditor
                        placeholder="Number Input Title"
                        onChange={(value) => {
                          dispatch({
                            type: 'changeNumberInputTitle',
                            payload: { id: answerOption.id, numberInputTitle: value }
                          });
                        }}
                      />
                      <DeleteButton
                        onClick={() =>
                          dispatch({
                            type: 'removeNumberInput',
                            payload: { id: answerOption.id }
                          })
                        }
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() =>
                        dispatch({
                          type: 'addNumberInput',
                          payload: {
                            id: answerOption.id,
                            numberInputTitle: 'mg'
                          }
                        })
                      }
                    >
                      Add number input
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InputEditorCard.propTypes = {
  id: number.isRequired,
  answerOption: shape({
    id: string.isRequired,
    title: string,
    hasNumberInput: bool
  }).isRequired,
  dispatch: func.isRequired
};

export default InputEditorCard;
