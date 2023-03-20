const Blog = require('../models/Blog');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllBlogs = asyncWrapper(async (req, res) => {
  const blogs = await Blog.find().sort('year');
  res.status(200).json({ blogs });
});

const createBlog = asyncWrapper(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({ blog });
});

const getBlog = asyncWrapper(async (req, res, next) => {
  const { id: blogID } = req.params;
  const blog = await Blog.findOne({ _id: blogID });
  if (!blog) {
    return next(createCustomError(`No blog with id : ${blogID}`, 404));
  }

  res.status(200).json({ blog });
});
const deleteBlog = asyncWrapper(async (req, res, next) => {
  const { id: blogID } = req.params;
  const blog = await Blog.findOneAndDelete({ _id: blogID });
  if (!blog) {
    return next(createCustomError(`No blog with id : ${blogID}`, 404));
  }
  res.status(200).json({ blog });
});
const updateBlog = asyncWrapper(async (req, res, next) => {
  const { id: blogID } = req.params;

  const blog = await Blog.findOneAndUpdate({ _id: blogID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    return next(createCustomError(`No blog with id : ${blogID}`, 404));
  }

  res.status(200).json({ blog });
});

module.exports = {
  getAllBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
