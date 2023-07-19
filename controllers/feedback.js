const Feedback = require('../models/Feedback');
const asyncWrapper = require('../middleware/async');
const { BadRequestError, NotFoundError } = require('../errors');
const { sendFeedbackRequestEmail } = require('../utils');

const getAllFeedback = asyncWrapper(async (req, res) => {
  const feedbacks = await Feedback.find().sort('date');
  res.status(200).json({ feedbacks });
});

const createFeedback = asyncWrapper(async (req, res) => {
  const feedback = await Feedback.create(req.body);
  // await sendFeedbackRequestEmail({
  //   name: feedback.name,
  //   email: feedback.email,
  //   phone: feedback.phone,
  //   company: feedback.company,
  //   region: feedback.region,
  //   service: feedback.service,
  //   hearAbout: feedback.hearAbout,
  // });
  res.status(201).json({ feedback });
});

const getFeedback = asyncWrapper(async (req, res, next) => {
  const { id: feedbackID } = req.params;
  const feedback = await Feedback.findOne({ _id: feedbackID });
  if (!feedback) {
    throw new NotFoundError(`No feedback with id : ${feedbackID}`);
  }

  res.status(200).json({ feedback });
});

const deleteFeedback = asyncWrapper(async (req, res, next) => {
  const { id: feedbackID } = req.params;
  const feedback = await Feedback.findOneAndDelete({ _id: feedbackID });
  if (!feedback) {
    throw new NotFoundError(`No feedback with id : ${feedbackID}`);
  }
  res.status(200).json({ feedback });
});
const updateFeedback = asyncWrapper(async (req, res, next) => {
  const { id: feedbackID } = req.params;

  const feedback = await Feedback.findOneAndUpdate(
    { _id: feedbackID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!feedback) {
    throw new NotFoundError(`No feedback with id : ${feedbackID}`);
  }

  res.status(200).json({ feedback });
});

module.exports = {
  getAllFeedback,
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
};
