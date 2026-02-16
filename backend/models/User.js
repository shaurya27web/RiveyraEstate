const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  phone: {
    type: String,
    trim: true
  },
  
  // Role: 'admin' (you), 'agent' (single agent), 'user' (regular visitors)
  role: {
    type: String,
    enum: ['admin', 'agent', 'user'],
    default: 'user'
  },
  
  // Profile
  profileImage: {
    type: String,
    default: '/images/default-avatar.jpg'
  },
  bio: {
    type: String,
    maxlength: 500
  },
  
  // Only for agent (single agent)
  agentInfo: {
    licenseNumber: String,
    experience: Number,
    specialization: [String],
    languages: [String],
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String
    },
    featured: {
      type: Boolean,
      default: true // Single agent is featured by default
    }
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Get public profile (no sensitive data)
userSchema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

// Check if user is admin
userSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

// Check if user is agent
userSchema.methods.isAgent = function() {
  return this.role === 'agent';
};

const User = mongoose.model('User', userSchema);

module.exports = User;