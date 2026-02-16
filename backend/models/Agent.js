// This is just a reference to the User model with role='agent'
// You can use this as a shortcut

const mongoose = require('mongoose');
const User = require('./User');

const Agent = User;

// Helper function to get the agent (there should be only one)
Agent.getMainAgent = async function() {
  return await this.findOne({ role: 'agent' }).select('-password');
};

module.exports = Agent;