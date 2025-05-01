module.exports = (req, res, next) => {
    const { content, rating } = req.body;
  
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Content is required' });
    }
  
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
  
    next();
  };
  