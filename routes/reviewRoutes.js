const express = require('express');
const ReviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController')

const router = express.Router({ mergeParams: true });

router
.route('/')
.get(ReviewController.getAllReview)
.post(authController.protect, authController.restrictTo('user'),ReviewController.createReview)

router
.route('/:id')
.delete(authController.protect, ReviewController.deleteReview)


module.exports = router;