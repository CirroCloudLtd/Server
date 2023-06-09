const Blog = require('../models/Blog');
const asyncWrapper = require('../middleware/async');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllBlogs = asyncWrapper(async (req, res) => {
  const blogs = await Blog.find().sort('date');
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
    throw new NotFoundError(`No blog with id : ${blogID}`);
  }

  res.status(200).json({ blog });
});
const deleteBlog = asyncWrapper(async (req, res, next) => {
  const { id: blogID } = req.params;
  const blog = await Blog.findOneAndDelete({ _id: blogID });
  if (!blog) {
    throw new NotFoundError(`No blog with id : ${blogID}`);
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
    throw new NotFoundError(`No blog with id : ${blogID}`);
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
