const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all properties (public)
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('agent', 'name email');
    res.json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get featured properties (public)
router.get('/featured', async (req, res) => {
  try {
    const properties = await Property.find({ featured: true })
      .populate('agent', 'name email')
      .limit(6);
    res.json({
      success: true,
      data: properties
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single property (public)
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('agent', 'name email phone profileImage');
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create property (protected - admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      agent: req.user._id
    };
    
    const property = new Property(propertyData);
    await property.save();
    
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update property (protected - admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    res.json({ success: true, data: property });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete property (protected - admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;