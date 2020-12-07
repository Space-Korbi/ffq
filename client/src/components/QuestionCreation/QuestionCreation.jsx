/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navigation from '../Navigation';
import Question from '../Question';
import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import AnswerButtons from './AnswerButtons';

const tabs = ['Creation', 'Order'];

const QuestionCreation = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [comment, setComment] = useState('');
  const [help, setHelp] = useState('');

  return (
    <div className="m-4">
      <Navigation tabs={tabs} />
      <div className="tab-content" id="questionCreationContent">
        <div
          className="tab-pane fade show active"
          id={tabs[0]}
          role="tabpanel"
          aria-labelledby={`${tabs[0]}-tab`}
        >
          <div className="row no-gutters">
            <div className="col-md-5 col-lg-6 m-2 ">
              <JumbotronInputs
                onChangeTitle={setTitle}
                onChangeSubTitle={setSubTitle}
                onChangeComment={setComment}
              />
              <HelpTextInput onChange={setHelp} />
              <AnswerButtons />
            </div>
            <div className="col mt-2 border border-info">
              <Question title={title} subtitle={subTitle} comment={comment} help={help} />
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade show "
          id={tabs[1]}
          role="tabpanel"
          aria-labelledby={`${tabs[1]}-tab`}
        >
          <div className="row">
            <div className="col">Hello World Order is Born</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCreation;
