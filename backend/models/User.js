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
  
  role: {
    type: String,
    enum: ['admin', 'agent', 'user'],
    default: 'user'
  },
  
  profileImage: {
    type: String,
    default: '/images/default-avatar.jpg'
  },
  bio: {
    type: String,
    maxlength: 500
  },
  
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
      default: false
    }
  },
  
  location: String,
  rating: Number,
  totalSales: Number,
  
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving - FIXED
userSchema.pre('save', function(next) {
  const user = this;
  
  // Only hash if password is modified
  if (!user.isModified('password')) return next();
  
  // Generate salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      
      user.password = hash;
      user.updatedAt = Date.now();
      next();
    });
  });
});

// Compare password method
userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

// Get public profile (no sensitive data)
userSchema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;