const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getUser = async (req, res) => {
  const {
    params: { email: userEmail },
  } = req;

  const user = await User.findOne({
    email: userEmail,
  });
  if (!user) {
    throw new NotFoundError(`No user with email ${userEmail}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteUser = async (req, res) => {
  const {
    params: { email: userEmail },
  } = req;

  const user = await User.findOneAndRemove({
    email: userEmail,
  });
  if (!user) {
    throw new NotFoundError(`No user with email ${userEmail}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
