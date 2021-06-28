/* eslint-disable no-alert */
import { updateQuestionById, uploadImage, uploadImageToCloudinary } from '../api';

import * as answers from '../constants/Answers';

/**
 * * Image Paths
 * Sending a request to the surver to upload the images
 * and return the filename in the DB as well as the path
 */

const updateAmountOption = (dbResponse, amountOption, cloudinaryURL) => {
  console.log(cloudinaryURL);
  const updatedAmountOption = {
    id: amountOption.id,
    title: amountOption.title,
    imageName: dbResponse.data.filename,
    imageURL: cloudinaryURL
  };
  return updatedAmountOption;
};

const saveImageInDB = async (amountOption) => {
  const data = new FormData();
  data.append('imageData', amountOption.imageData);
  const dbImageNameAndPath = await uploadImage(data);
  return dbImageNameAndPath;
};

const uploadToCloudinary = async (amountOption) => {
  const data = new FormData();
  data.append('image', amountOption.imageData);
  await uploadImageToCloudinary
    .then((url) => {
      console.log(url);
      return url;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * TODO
 * when changin images, delete the old image that is being replaced from uploads
 * Might be implemented already... needs to be checked
 */

const updateAmountOptions = async (amountOptions) => {
  const updatedAmountOptions = await Promise.all(
    amountOptions.map(async (amountOption) => {
      if (!amountOption.imageData) {
        return Promise.resolve(amountOption);
      }
      const dbImageData = await saveImageInDB(amountOption);
      const cloudinaryURL = await uploadToCloudinary(amountOption);
      const updatedAmountOption = updateAmountOption(dbImageData, amountOption, cloudinaryURL);
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
    window.alert(`Question could not be saved. A valid question ID was not provided.`);
    return undefined;
  }

  payload.answerOptions = answerOptions;

  if (answerOptions.type === answers.TYPE.Card) {
    const updatedAmountOptions = await updateAmountOptions(answerOptions.options);
    payload.answerOptions.options = updatedAmountOptions;
  }

  return updateQuestionById(questionId, payload);
};

const questionService = { saveQuestion };

export default questionService;
