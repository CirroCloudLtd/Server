const Demo = require('../models/Demo');
const asyncWrapper = require('../middleware/async');
const { BadRequestError, NotFoundError } = require('../errors');
const { sendDemoRequestEmail } = require('../utils');

const getAllDemos = asyncWrapper(async (req, res) => {
  const demos = await Demo.find().sort('date');
  res.status(200).json({ demos });
});

const createDemo = asyncWrapper(async (req, res) => {
  const demo = await Demo.create(req.body);
  await sendDemoRequestEmail({
    name: demo.name,
    email: demo.email,
    phone: demo.phone,
    company: demo.company,
    region: demo.region,
    service: demo.service,
    hearAbout: demo.hearAbout,
  });
  res.status(201).json({ demo });
});

const getDemo = asyncWrapper(async (req, res, next) => {
  const { id: demoID } = req.params;
  const demo = await Demo.findOne({ _id: demoID });
  if (!demo) {
    throw new NotFoundError(`No demo with id : ${demoID}`);
  }

  res.status(200).json({ demo });
});

const deleteDemo = asyncWrapper(async (req, res, next) => {
  const { id: demoID } = req.params;
  const demo = await Demo.findOneAndDelete({ _id: demoID });
  if (!demo) {
    throw new NotFoundError(`No demo with id : ${demoID}`);
  }
  res.status(200).json({ demo });
});
const updateDemo = asyncWrapper(async (req, res, next) => {
  const { id: demoID } = req.params;

  const demo = await Demo.findOneAndUpdate({ _id: demoID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!demo) {
    throw new NotFoundError(`No demo with id : ${demoID}`);
  }

  res.status(200).json({ demo });
});

module.exports = {
  getAllDemos,
  createDemo,
  getDemo,
  updateDemo,
  deleteDemo,
};
