/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';
import { string, shape, arrayOf, exact, bool, oneOfType, func } from 'prop-types';
import { useParams } from 'react-router-dom';
// custom hooks
import { useSaveAnswer } from '../../hooks';

// components
import Jumbotron from '../Jumbotron';
import { Help } from '../Popover';
import AnswerButtons from './FrequencyAnswer/AnswerButtons';
import AmountAnswer from './AmountAnswer/AmountAnswer';
import UserInputAnswer from './UserInputAnswer/UserInputAnswer';
import Carousel from '../Carousel';

// enums
import * as answers from '../../constants/Answers';

function Answers({ answerOptions, setUserInput, previouslySubmittedAnswer, isPreview }) {
  console.log('single', answerOptions.type === answers.TYPE.SingleChoiceButton);
  console.log('multiple', answerOptions.type === answers.TYPE.MultipleChoiceButton);
  switch (answerOptions.type) {
    case answers.TYPE.SingleChoiceButton:
      return (
        <div className="row no-gutters d-flex align-items-stretch">
          <div className="col">
            <AnswerButtons
              leftAnswerOptions={answerOptions.options.left}
              rightAnswerOptions={answerOptions.options.right}
              previouslySubmittedAnswer={previouslySubmittedAnswer}
              isMultipleChoice={answerOptions.isMultipleChoice}
              setUserInput={setUserInput}
              isPreview={isPreview}
            />
          </div>
        </div>
      );
    case answers.TYPE.MultipleChoiceButton:
      return (
        <div className="row no-gutters d-flex align-items-stretch">
          <div className="col">
            <AnswerButtons
              leftAnswerOptions={answerOptions.options.left}
              rightAnswerOptions={answerOptions.options.right}
              previouslySubmittedAnswer={previouslySubmittedAnswer}
              isMultipleChoice={answerOptions.isMultipleChoice}
              setUserInput={setUserInput}
              isPreview={isPreview}
            />
          </div>
        </div>
      );
    case answers.TYPE.Card:
      return (
        <div>
          <AmountAnswer
            answerOptions={answerOptions.options}
            previouslySubmittedAnswer={previouslySubmittedAnswer}
            setUserInput={setUserInput}
          />
        </div>
      );
    case answers.TYPE.TextInput:
      return (
        <div className="row no-gutters d-flex align-items-stretch">
          <div className="col">
            <UserInputAnswer
              answerOptions={answerOptions.options}
              previouslySubmittedAnswer={previouslySubmittedAnswer}
              setUserInput={setUserInput}
            />
          </div>
        </div>
      );
    default:
      return <div />;
  }
}

const Question = ({
  id,
  title,
  subtitle1,
  subtitle2,
  help,
  answerOptions,
  previouslySubmittedAnswer,
  onSubmitAnswer,
  iterationId,
  isPreview,
  isImage
}) => {
  const { userId } = useParams();
  const [{ userInput, isSaving, isSavingError }, setUserInput] = useSaveAnswer(
    userId,
    iterationId,
    id,
    answerOptions.type
  );

  useEffect(() => {
    if (!userInput) {
      return;
    }
    if (!isSaving && !isSavingError && !isPreview) {
      onSubmitAnswer(userInput);
    }
  }, [userInput]);

  return (
    <div>
      {isImage ? (
        <div>
          <Carousel
            imageURLs={answerOptions.options.map((option) => {
              return option.imageURL;
            })}
            onSubmitAnswer={() =>
              onSubmitAnswer({ questionId: id, answerOption: [{ id: 'images' }] })
            }
          />
        </div>
      ) : (
        <>
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
          <div>
            {isSavingError ? (
              'Etwas ist schiefgelaufen'
            ) : (
              <>
                {isSaving ? (
                  'Speichern...'
                ) : (
                  <Answers
                    answerOptions={answerOptions}
                    previouslySubmittedAnswer={previouslySubmittedAnswer}
                    setUserInput={setUserInput}
                    isPreview={isPreview}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

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
        left: arrayOf(shape({ id: string.isRequired, title: string })),
        right: arrayOf(shape({ id: string.isRequired, title: string }))
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
    ])
  }).isRequired,
  previouslySubmittedAnswer: oneOfType([
    shape({}),
    shape({
      questionId: string,
      createdAt: string,
      updatedAt: string,
      userInput: {
        selectedButtonsLeft: arrayOf(shape({ id: string, title: string })),
        selectedButtonsRight: arrayOf(shape({ id: string, title: string }))
      }
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
  ]),
  onSubmitAnswer: func.isRequired,
  isPreview: bool,
  isImage: bool
};

Question.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  help: '',
  previouslySubmittedAnswer: null,
  isPreview: false,
  isImage: false
};

export default Question;
