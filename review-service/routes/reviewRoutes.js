const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const validateReview = require('../middlewares/validateReview');

// POST /api/reviews
router.post('/', reviewController.createReview);

// GET /api/reviews
router.get('/', reviewController.getAllReviews);

// GET /api/reviews/movie/:movie_id
router.get('/movie/:movie_id', reviewController.getReviewsByMovieId);

// PUT /api/reviews/:id
router.put('/:id', reviewController.updateReview);

// DELETE /api/reviews/:id
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
