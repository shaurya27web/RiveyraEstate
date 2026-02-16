const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  features: {
    bedrooms: Number,
    bathrooms: Number,
    area: Number,
    garage: Boolean,
    yearBuilt: Number
  },
  images: [{
    url: String,
    caption: String
  }],
  propertyType: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'land', 'commercial'],
    required: true
  },
  status: {
    type: String,
    enum: ['for-sale', 'for-rent', 'sold', 'pending'],
    default: 'for-sale'
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // All properties must be linked to the agent
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Property', propertySchema);