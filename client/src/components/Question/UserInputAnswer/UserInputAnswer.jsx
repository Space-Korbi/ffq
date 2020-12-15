import React from 'react';
import { shape, arrayOf, string, bool } from 'prop-types';
import { nanoid } from 'nanoid';

/**
 * TODO
 * only allow integers to be entered in number input
 */

function UserInputAnswer({ answerOptions }) {
  return (
    <div>
      {answerOptions.map((answerOption) => {
        return (
          <div key={answerOption.id} className="m-4">
            <form>
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
                      className="form-control"
                      aria-label="user input"
                      aria-describedby="inputGroup-sizing-lg"
                    />
                  </div>
                </div>
                {answerOption.hasNumberInput && (
                  <div className="col-4">
                    <div className="input-group input-group-lg">
                      <input type="number" min="0" className="form-control" />
                      <div className="input-group-append">
                        <span className="input-group-text" id="inputGroup-sizing-lg">
                          {answerOption.numberInputTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        );
      })}
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
  )
};

UserInputAnswer.defaultProps = {
  answerOptions: [
    { key: nanoid(), type: 'textInput', title: 'Lebensmittel' },
    { key: nanoid(), type: 'textInput', title: 'Lebensmittel' },
    { key: nanoid(), type: 'textInput', title: 'Lebensmittel' }
  ]
};

export default UserInputAnswer;
