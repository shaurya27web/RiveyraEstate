const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all agents
router.get('/', async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.json({
      success: true,
      count: agents.length,
      data: agents
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single agent
router.get('/:id', async (req, res) => {
  try {
    const agent = await User.findOne({ 
      _id: req.params.id, 
      role: 'agent' 
    }).select('-password');
    
    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    
    res.json({ success: true, data: agent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;