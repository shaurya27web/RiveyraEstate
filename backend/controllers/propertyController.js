const Property = require('../models/Property');

// Get all properties with filtering
exports.getProperties = async (req, res) => {
  try {
    const { 
      propertyType, 
      minPrice, 
      maxPrice, 
      city, 
      bedrooms,
      status,
      featured,
      page = 1,
      limit = 10 
    } = req.query;

    let query = {};

    // Build filter object
    if (propertyType) query.propertyType = propertyType;
    if (status) query.status = status;
    if (featured) query.featured = featured === 'true';
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (bedrooms) query['features.bedrooms'] = parseInt(bedrooms);
    
    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const properties = await Property.find(query)
      .populate('agent', 'name email phone profileImage')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Property.countDocuments(query);

    res.json({
      success: true,
      count: properties.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: properties
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single property
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('agent', 'name email phone profileImage bio socialLinks');

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create property (for agents/admin)
exports.createProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      agent: req.user.id // from auth middleware
    });
    await property.save();
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get featured properties
exports.getFeaturedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ featured: true })
      .populate('agent', 'name email')
      .limit(6);
    
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};