const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  qtn_text: {
    type: String,
    required: [true, 'must provide blog'],
  },
  year: Number,
  paper: Number,
  section: String,
  topic: String,
  answer: String,
  katex_blog: String,
  katex_answer: String,
  edited: Boolean,
});

module.exports = mongoose.model('Blog', BlogSchema);
