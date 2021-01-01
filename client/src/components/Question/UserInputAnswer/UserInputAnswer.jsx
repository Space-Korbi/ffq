import React, { useState } from 'react';
import { shape, arrayOf, string, bool, func } from 'prop-types';
/**
 * TODO
 * only allow integers to be entered in number input
 */

function UserInputAnswer({ answerOptions, submittedAnswer, onSubmit }) {
  const [userInput, setUserInput] = useState({});

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(userInput);
        }}
      >
        {answerOptions.map((answerOption) => {
          let inputValue = '';
          let numberInputValue = '';

          submittedAnswer.answers.forEach((answer) => {
            if (answer.id === answerOption.id) {
              inputValue = answer.value;
            }
          });

          if (answerOption.hasNumberInput) {
            submittedAnswer.answers.forEach((answer) => {
              if (answer.id === answerOption.id) {
                numberInputValue = answer.numberValue;
              }
            });
          }

          return (
            <div key={answerOption.id} className="m-4">
              <div className="row">
                <div className="col">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        {answerOption.title}
                      </span>
                    </div>
                    <input
                      type="text"
                      id={answerOption.id}
                      className="form-control"
                      aria-label="user input"
                      aria-describedby="inputGroup-sizing-lg"
                      placeholder={inputValue}
                      onChange={(e) => {
                        const newInput = userInput;
                        newInput[e.target.id] = e.target.value;
                        setUserInput(newInput);
                      }}
                    />
                  </div>
                </div>
                {answerOption.hasNumberInput && (
                  <div className="col-4">
                    <div className="input-group input-group-lg">
                      <input
                        type="number"
                        id={`${answerOption.id}-numberInput`}
                        min="0"
                        className="form-control"
                        placeholder={numberInputValue}
                        onChange={(e) => {
                          const newInput = userInput;
                          newInput[e.target.id] = e.target.value;
                          setUserInput(newInput);
                        }}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="inputGroup-sizing-lg">
                          {answerOption.numberInputTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="d-flex justify-content-center mb-3">
          <button type="submit" className="btn btn-outline-primary">
            Weiter
          </button>
        </div>
      </form>
    </div>
  );
}

UserInputAnswer.propTypes = {
  answerOptions: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      hasNumberInput: bool,
      numberInputTitle: string
    })
  ).isRequired,
  submittedAnswer: shape({
    questionId: string,
    answer: arrayOf(shape({ id: string, value: string }))
  }),
  onSubmit: func.isRequired
};

UserInputAnswer.defaultProps = {
  submittedAnswer: { questionId: '', answer: [{ id: '', value: '' }] }
};

export default UserInputAnswer;
