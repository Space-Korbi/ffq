import { insertQuestion, uploadImage } from '../api';
// eslint-disable-next-line import/no-cycle
import { AnswerType } from '../helpers';

/**
 * * Image Paths
 * Sending a request to the surver to upload the images
 * and return the filename in the DB as well as the path
 */

const updateAmountOption = (dbResponse, amountOption) => {
  const updatedAmountOption = amountOption;
  updatedAmountOption.imageName = dbResponse.data.filename;
  updatedAmountOption.imageURL = dbResponse.data.path;
  return updatedAmountOption;
};

const fetchDBImagData = async (amountOption) => {
  const data = new FormData();
  data.append('imageData', amountOption.imageData);
  const dbImageNameAndPath = await uploadImage(data);
  return dbImageNameAndPath;
};

const updateAmountOptions = async (amountOptions) => {
  const updatedAmountOptions = await Promise.all(
    amountOptions.map(async (amountOption) => {
      if (!amountOption.imageData) {
        return Promise.resolve(amountOption);
      }
      const dbImageData = await fetchDBImagData(amountOption);
      const updatedAmountOption = updateAmountOption(dbImageData, amountOption);
      return Promise.resolve(updatedAmountOption);
    })
  );
  return updatedAmountOptions;
};

const saveQuestion = async (questionData, answerOptions) => {
  const payload = questionData;
  payload.answerOptions = answerOptions;

  if (answerOptions.type === AnswerType.Amount) {
    const updatedAmountOptions = await updateAmountOptions(answerOptions.amountOptions);
    payload.answerOptions.amountOptions = updatedAmountOptions;
  }

  console.log('Payload', payload);
  await insertQuestion(payload).then(() => {
    // eslint-disable-next-line
    window.alert(`Question inserted successfully`);
  });
};

const questionService = { saveQuestion };

export default questionService;
