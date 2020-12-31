import React, { useEffect, useState } from 'react';
import { string, shape, arrayOf, exact, bool, oneOfType } from 'prop-types';
import { useParams } from 'react-router-dom';

// hooks
import { useSaveAnswer } from '../../hooks';

import Jumbotron from '../Jumbotron';
import Help from '../Help';
import AnswerButtons from './FrequencyAnswer/AnswerButtons';
import AmountAnswer from './AmountAnswer/AmountAnswer';
import UserInputAnswer from './UserInputAnswer/UserInputAnswer';
import AnswerType from '../../types';

function Question({ id, title, subtitle1, subtitle2, help, answerOptions }) {
  const { userId } = useParams();
  const [answerContainer, setAnswerContainer] = useState();
  const [{ answer, isLoading, isError }, setAnswer] = useSaveAnswer(userId, id);

  console.log('ANSWER: ', answer);
  console.log('Other: ', isLoading, isError);

  useEffect(() => {
    switch (answerOptions.type) {
      case AnswerType.Frequency:
        setAnswerContainer(
          <div className="row no-gutters d-flex align-items-stretch">
            <div className="col">
              <AnswerButtons
                leftAnswerOptions={answerOptions.options.left}
                rightAnswerOptions={answerOptions.options.right}
                onClick={setAnswer}
              />
            </div>
          </div>
        );
        break;
      case AnswerType.Amount:
        setAnswerContainer(
          <div>
            <AmountAnswer answerOptions={answerOptions.options} onClick={setAnswer} />
          </div>
        );
        break;
      default:
        setAnswerContainer(
          <div className="row no-gutters d-flex align-items-stretch">
            <div className="col">
              <UserInputAnswer answerOptions={answerOptions.options} onSubmit={setAnswer} />
            </div>
          </div>
        );
    }
  }, [answerOptions]);

  return (
    <div>
      <div>
        <Jumbotron title={title} subtitle1={subtitle1} subtitle2={subtitle2} />
      </div>
      {help && (
        <div className="row no-gutters">
          <div className="col d-flex justify-content-end">
            <Help infoText={help} />
          </div>
        </div>
      )}
      <div>{answerContainer}</div>
    </div>
  );
}

Question.propTypes = {
  id: string.isRequired,
  title: string,
  subtitle1: string,
  subtitle2: string,
  help: string,
  answerOptions: shape({
    type: string.isRequired,
    options: oneOfType([
      exact({
        left: arrayOf(exact({ id: string.isRequired, title: string })),
        right: arrayOf(exact({ id: string.isRequired, title: string }))
      }),
      arrayOf(
        shape({
          id: string.isRequired,
          title: string,
          imageName: string,
          imageURL: string
        })
      ),
      arrayOf(
        shape({
          id: string.isRequired,
          title: string,
          hasNumberInput: bool,
          numberInputTitle: string
        })
      )
    ]).isRequired
  }).isRequired
};

Question.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  help: ''
};

export default Question;
