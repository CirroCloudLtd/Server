const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  readTime: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Blog', BlogSchema);
