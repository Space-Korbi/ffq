import React, { useState, useEffect } from 'react';
import { shape, arrayOf, string, bool, func } from 'prop-types';
import { get, findIndex, endsWith, trimEnd, differenceBy } from 'lodash';
/**
 * TODO
 * only allow integers to be entered in number input
 */

function UserInputAnswer({ answerOptions, submittedAnswer, onSubmit }) {
  const [userInputs, setUserInputs] = useState(answerOptions);

  useEffect(() => {
    if (get(submittedAnswer, ['answerOption', '0', 'answer'])) {
      const difference = differenceBy(submittedAnswer.answerOption, answerOptions, 'id');
      const allInputFields = submittedAnswer.answerOption.concat(difference);
      setUserInputs(allInputFields);
    }
  }, [submittedAnswer]);

  useEffect(() => {
    setUserInputs(answerOptions);
  }, [answerOptions]);

  function updateAnswer(e) {
    const updatedUserInputs = [...userInputs];
    let index;
    let answeredInputField;
    if (endsWith(e.target.id, 'numberInput')) {
      const trimmed = trimEnd(e.target.id, '-numberInput');
      index = findIndex(userInputs, { id: trimmed });
      answeredInputField = userInputs[index];
      answeredInputField.numberAnswer = e.target.value;
    } else {
      index = findIndex(userInputs, { id: e.target.id });
      answeredInputField = userInputs[index];
      answeredInputField.answer = e.target.value;
    }
    updatedUserInputs.splice(index, 1, answeredInputField);
    setUserInputs(updatedUserInputs);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(userInputs);
        }}
      >
        {userInputs.map((userInput) => {
          return (
            <div key={userInput.id} className="m-4">
              <div className="row">
                <div className="col">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        {userInput.title}
                      </span>
                    </div>
                    <input
                      type="text"
                      id={userInput.id}
                      className="form-control"
                      aria-label="user input"
                      aria-describedby="inputGroup-sizing-lg"
                      placeholder={userInput.answer}
                      onChange={(e) => {
                        updateAnswer(e);
                      }}
                    />
                  </div>
                </div>
                {userInput.hasNumberInput && (
                  <div className="col-4">
                    <div className="input-group input-group-lg">
                      <input
                        type="number"
                        id={`${userInput.id}-numberInput`}
                        min="0"
                        className="form-control"
                        placeholder={userInput.numberAnswer}
                        onChange={(e) => {
                          updateAnswer(e);
                        }}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="inputGroup-sizing-lg">
                          {userInput.numberInputTitle}
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
    answerOption: arrayOf(shape({ id: string, title: string }))
  }),
  onSubmit: func.isRequired
};

UserInputAnswer.defaultProps = {
  submittedAnswer: { questionId: '', answer: [{ id: '', value: '' }] }
};

export default UserInputAnswer;
