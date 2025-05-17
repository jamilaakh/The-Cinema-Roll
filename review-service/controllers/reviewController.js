const axios = require('axios');
const Review = require('../models/review');

// Create new review
exports.createReview = async (req, res) => {
    try {
        const { user_id } = req.body;

        // Validate user by calling User Service
        const userServiceUrl = `http://localhost:5000/api/users/${user_id}/validate`;
        const userValidationResponse = await axios.get(userServiceUrl);

        if (userValidationResponse.status !== 200) {
            return res.status(401).json({ message: 'User validation failed.' });
        }

        // Proceed with review creation
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(401).json({ message: 'User not found or unauthorized.' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews by movie ID
exports.getReviewsByMovieId = async (req, res) => {
  try {
    const reviews = await Review.find({ movie_id: req.params.movie_id });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update review by ID
exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete review by ID
exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
