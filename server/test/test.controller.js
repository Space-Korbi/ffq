const Test = require('./test.model');

/**
 * * Test controller
 * This class contains the functions to
 * create, update, delete and get test entries
 */

const createTest = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a test'
    });
  }

  const test = new Test(body);

  if (!test) {
    return res.status(400).json({ success: false, error: err });
  }

  test
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: test._id,
        message: 'Test created!'
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Test not created!'
      });
    });
};

const deleteTest = async (req, res) => {
  await Test.findById({ _id: req.params.id }, (err, test) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!test) {
      return res.status(404).json({ success: false, error: `Test not found` });
    }

    return res.status(200).json({ success: true, data: test });
  }).catch((err) => console.log(err));

  await Test.findByIdAndDelete({ _id: req.params.id }, (err, test) => {});
};

const getTests = async (req, res) => {
  await Test.find({}, (err, tests) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!tests.length) {
      return res.status(404).json({ success: false, error: `Test not found` });
    }
    return res.status(200).json({ success: true, data: tests });
  }).catch((err) => console.log(err));
};

const getTestById = async (req, res) => {
  await Test.find({ _id: req.params.id }, (err, tests) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: tests });
  }).catch((err) => console.log(err));
};

const updateTestById = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    });
  }

  Test.findOne({ _id: req.params.id }, async (err, test) => {
    if (err) {
      return res.status(404).json({
        err
      });
    }

    const testUpdate = test;

    testUpdate.title = body.testData.title;
    testUpdate.subtitle1 = body.testData.subtitle1;
    testUpdate.subtitle2 = body.testData.subtitle2;
    testUpdate.help = body.testData.help;
    testUpdate.answerOptions = body.answerOptions;

    testUpdate
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Test updated!'
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Test not updated!'
        });
      });
  });
};

module.exports = {
  createTest,
  getTests,
  getTestById,
  updateTestById,
  deleteTest
};
