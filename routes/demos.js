const express = require('express');
const router = express.Router();

const {
  getAllDemos,
  createDemo,
  getDemo,
  updateDemo,
  deleteDemo,
  editDemo,
} = require('../controllers/demos');

router.route('/').get(getAllDemos).post(createDemo);
router.route('/:id').get(getDemo).patch(updateDemo).delete(deleteDemo);

module.exports = router;
