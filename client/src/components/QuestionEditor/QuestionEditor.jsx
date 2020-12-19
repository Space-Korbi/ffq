/* eslint-disable no-restricted-syntax */
import React, { useState, useReducer } from 'react';
import { string, shape, arrayOf, number, exact } from 'prop-types';
import { nanoid } from 'nanoid';

import { NavTabs, NavContents } from '../Navigation';
import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import QuestionPreview from './QuestionPreview';
import Select from '../Select';
import { AnswerType, answerReducer } from '../../helpers';
import { insertQuestion, uploadImage } from '../../api';
import AnswerEditor from '../AnswerEditor/AnswerEditor';

const tabNames = ['Edit', 'Arrange'];

const genericFunction = async (amountOptions) => {
  const amountOptionsWithDBImagePaths = await Promise.all(
    amountOptions.map(async (amountOption) => {
      if (!amountOption.imageData) {
        const amountOptionWithText = {
          id: amountOption.id,
          title: amountOption.title
        };
        return Promise.resolve(amountOptionWithText);
      }

      const data = new FormData();
      data.append('imageData', amountOption.imageData);
      const response = await uploadImage(data);

      const imageName = response;
      const amountOptionWithImagePath = {
        id: amountOption.id,
        imageName: imageName.data.filename,
        imageURL: imageName.data.path
      };

      return Promise.resolve(amountOptionWithImagePath);
    })
  );

  return amountOptionsWithDBImagePaths;
};

const QuestionEditor = ({ question }) => {
  const [title, setTitle] = useState(question.title);
  const [subtitle1, setSubtitle1] = useState(question.subtitle1);
  const [subtitle2, setSubtitle2] = useState(question.subtitle2);
  const [help, setHelp] = useState(question.help);

  const [answerType, setAnswerType] = useState('');
  const [answerOptions, dispatch] = useReducer(answerReducer, question.answerOptions);

  const handleSaveQuestion = async () => {
    const { index, questionId } = question;

    let newAnswerOptions = {};

    switch (answerType) {
      case AnswerType.Frequency:
        newAnswerOptions = {
          type: AnswerType.Frequency,
          frequencyOptions: answerOptions.frequencyOptions
        };
        break;
      case AnswerType.Amount:
        newAnswerOptions = {
          type: AnswerType.Amount,
          amountOptions: await genericFunction(answerOptions.amountOptions)
        };
        break;
      case AnswerType.UserInput:
        newAnswerOptions = {
          type: AnswerType.UserInput,
          userInputOptions: answerOptions.userInputOptions
        };
        break;
      default:
        break;
    }

    const payload = {
      questionId,
      index,
      title,
      subtitle1,
      subtitle2,
      help,
      parentQuestion: '',
      childQuestion: [],
      answerOptions: newAnswerOptions
    };
    // eslint-disable-next-line
    console.log('Payload', payload);

    await insertQuestion(payload).then(() => {
      // eslint-disable-next-line
      window.alert(`Question inserted successfully`);
    });
  };

  const editor = (
    <div className="row no-gutters my-3">
      <div className="col-lg mx-3">
        <div className="my-2">
          <Select onChange={setAnswerType} dispatch={dispatch} />
        </div>
        <div className="my-4">
          <JumbotronInputs
            onChangeTitle={setTitle}
            onChangeSubtitle={setSubtitle1}
            onChangeComment={setSubtitle2}
          />
          <HelpTextInput onChange={setHelp} />
        </div>
        <AnswerEditor answerOptions={answerOptions} answerType={answerType} dispatch={dispatch} />
      </div>

      <div className="col col-lg-5 px-0 mx-lg-3">
        <div className="text-center my-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => handleSaveQuestion()}
          >
            Save Question
          </button>
        </div>
        <QuestionPreview
          title={title}
          subtitle1={subtitle1}
          subtitle2={subtitle2}
          help={help}
          answerOptions={answerOptions}
          answerType={answerType}
        />
      </div>
    </div>
  );

  const arrange = (
    <div className="row">
      <div className="col">Hello World Arrangement</div>
    </div>
  );

  return (
    <div>
      <div className="m-3">
        <NavTabs tabNames={tabNames} />
      </div>
      <div>
        <NavContents tabNames={tabNames} tabContents={[editor, arrange]} />
      </div>
    </div>
  );
};

QuestionEditor.propTypes = {
  question: shape({
    questionId: string,
    index: number.isRequired,
    title: string,
    subtitle1: string,
    subtitle2: string,
    help: string,
    parentQuestion: string,
    childQuestion: arrayOf(string),
    answerOptions: shape({
      type: string.isRequired,
      frequencyAnswers: exact({
        left: arrayOf(exact({ id: string.isRequired, title: string })),
        right: arrayOf(exact({ id: string.isRequired, title: string }))
      }),
      amountAnswers: arrayOf(
        shape({
          id: string.isRequired,
          title: string,
          imageName: string,
          imageURLs: string
        })
      ),
      userInputAnswers: arrayOf(
        shape({
          id: string.isRequired,
          type: string,
          title: string
        })
      )
    }).isRequired
  })
};

// TODO index needs to be passed down from parent component
QuestionEditor.defaultProps = {
  question: {
    questionId: nanoid(),
    index: 2,
    title: '',
    subtitle1: '',
    subtitle2: '',
    help: '',
    parentQuestion: '',
    childQuestion: [''],
    answerOptions: {
      type: '',
      frequencyOptions: { left: [], right: [] },
      amountOptions: [],
      userInputOptions: []
    }
  }
};

export default QuestionEditor;
