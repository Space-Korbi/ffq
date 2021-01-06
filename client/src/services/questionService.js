/* eslint-disable no-alert */
import { nanoid } from 'nanoid';
import {
  insertQuestionAt,
  updateQuestionById,
  uploadImage,
  getAllQuestions,
  deleteQuestionById
} from '../api';
import AnswerType from '../types';

/**
 * * Image Paths
 * Sending a request to the surver to upload the images
 * and return the filename in the DB as well as the path
 */

const createQuestion = async (questionnaireId) => {
  const questionId = nanoid();

  const payload = {
    _id: questionId
  };

  await insertQuestionAt(questionnaireId, payload).then((res) => {
    return res.data.id;
  });
};

const updateAmountOption = (dbResponse, amountOption) => {
  const updatedAmountOption = {
    id: amountOption.id,
    title: amountOption.title,
    imageName: dbResponse.data.filename
  };
  return updatedAmountOption;
};

const saveImageInDB = async (amountOption) => {
  const data = new FormData();
  data.append('imageData', amountOption.imageData);
  const dbImageNameAndPath = await uploadImage(data);
  return dbImageNameAndPath;
};

/**
 * TODO
 * when changin images, delete the old image that is being replaced from uploads
 */

const updateAmountOptions = async (amountOptions) => {
  const updatedAmountOptions = await Promise.all(
    amountOptions.map(async (amountOption) => {
      if (!amountOption.imageData) {
        return Promise.resolve(amountOption);
      }
      const dbImageData = await saveImageInDB(amountOption);
      const updatedAmountOption = updateAmountOption(dbImageData, amountOption);
      return Promise.resolve(updatedAmountOption);
    })
  );
  return updatedAmountOptions;
};

const saveQuestion = async (questionId, questionData, answerOptions) => {
  const payload = {
    questionId,
    questionData
  };

  if (!questionId) {
    window.alert(`Question could not be inserted. A valid question ID was not provided.`);
    return;
  }

  payload.answerOptions = answerOptions;

  if (answerOptions.type === AnswerType.Amount) {
    const updatedAmountOptions = await updateAmountOptions(answerOptions.options);
    payload.answerOptions.options = updatedAmountOptions;
  }

  await updateQuestionById(questionId, payload).then(() => {});
};

const fetchAllQuestions = async () => {
  const questions = await getAllQuestions();
  return questions.data.data;
};

const deleteQuestion = async (id) => {
  const deletedQuestion = await deleteQuestionById(id);
  return deletedQuestion;
};

const questionService = { createQuestion, saveQuestion, fetchAllQuestions, deleteQuestion };

export default questionService;
