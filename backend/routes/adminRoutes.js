const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');
const Contact = require('../models/Contact');
const { protect, authorize } = require('../middleware/authMiddleware');

// All admin routes are protected and require admin role
router.use(protect, authorize('admin'));

// Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const stats = {
      totalProperties: await Property.countDocuments(),
      propertiesForSale: await Property.countDocuments({ status: 'for-sale' }),
      propertiesForRent: await Property.countDocuments({ status: 'for-rent' }),
      soldProperties: await Property.countDocuments({ status: 'sold' }),
      totalInquiries: await Contact.countDocuments(),
      newInquiries: await Contact.countDocuments({ status: 'new' }),
      totalUsers: await User.countDocuments({ role: 'user' })
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Manage properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('agent', 'name email')
      .sort('-createdAt');
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Manage inquiries
router.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await Contact.find()
      .populate('propertyId', 'title')
      .sort('-createdAt');
    res.json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update inquiry status
router.patch('/inquiries/:id', async (req, res) => {
  try {
    const inquiry = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get agent profile (single agent)
router.get('/agent', async (req, res) => {
  try {
    const agent = await User.findOne({ role: 'agent' }).select('-password');
    res.json({ success: true, data: agent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update agent profile
router.put('/agent', async (req, res) => {
  try {
    const agent = await User.findOneAndUpdate(
      { role: 'agent' },
      req.body,
      { new: true }
    ).select('-password');
    res.json({ success: true, data: agent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;