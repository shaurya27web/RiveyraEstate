const express = require('express');
const router = express.Router();
const { 
  getProperties, 
  getPropertyById, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  getFeaturedProperties 
} = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.post('/', protect, authorize('agent', 'admin'), createProperty);
router.put('/:id', protect, authorize('agent', 'admin'), updateProperty);
router.delete('/:id', protect, authorize('agent', 'admin'), deleteProperty);

module.exports = router;