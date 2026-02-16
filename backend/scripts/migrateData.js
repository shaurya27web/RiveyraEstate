const mongoose = require('mongoose');
const Property = require('../models/Property');
const User = require('../models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Explicit path to .env

// Debug: Check if env variables are loaded
console.log('Current directory:', __dirname);
console.log('Environment variables loaded:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ Not found');
console.log('- PORT:', process.env.PORT ? '✅ Found' : '❌ Not found');

if (!process.env.MONGODB_URI) {
  console.error('\n❌ ERROR: MONGODB_URI is not defined in .env file');
  console.log('\nPlease make sure:');
  console.log('1. You have a .env file in the backend folder');
  console.log('2. The .env file contains: MONGODB_URI=your_connection_string');
  console.log('3. The connection string is correct');
  console.log('\nExample .env content:');
  console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/realestate');
  console.log('PORT=5000');
  console.log('JWT_SECRET=your_secret_key');
  process.exit(1);
}

// Transform dummy agents to match User schema
const dummyAgents = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@riveryra.com',
    password: 'password123',
    phone: '+1 (555) 123-4567',
    role: 'agent',
    profileImage: 'https://images.unsplash.com/photo-1624395213043-fa2e123b2656?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D',
    bio: 'Senior Real Estate Agent with 8+ years of experience specializing in luxury properties.',
    location: 'New York, NY',
    rating: 4.9,
    totalSales: 245,
    agentInfo: {
      licenseNumber: 'LIC' + Math.floor(Math.random() * 1000000),
      experience: 8,
      specialization: ['Luxury Homes', 'Penthouse', 'Commercial'],
      languages: ['English'],
      socialLinks: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      },
      featured: true
    },
    isActive: true
  },
  {
    name: 'Michael Chen',
    email: 'michael@riveryra.com',
    password: 'password123',
    phone: '+1 (555) 234-5678',
    role: 'agent',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    bio: 'Commercial Real Estate Expert with 12+ years of experience in investment properties.',
    location: 'San Francisco, CA',
    rating: 4.8,
    totalSales: 312,
    agentInfo: {
      licenseNumber: 'LIC' + Math.floor(Math.random() * 1000000),
      experience: 12,
      specialization: ['Commercial', 'Investment', 'Office Space'],
      languages: ['English', 'Mandarin'],
      socialLinks: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      },
      featured: false
    },
    isActive: true
  },
  {
    name: 'Elena Rodriguez',
    email: 'elena@riveryra.com',
    password: 'password123',
    phone: '+1 (555) 345-6789',
    role: 'agent',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    bio: 'Luxury Property Specialist with 6+ years of experience in waterfront properties.',
    location: 'Miami, FL',
    rating: 4.9,
    totalSales: 187,
    agentInfo: {
      licenseNumber: 'LIC' + Math.floor(Math.random() * 1000000),
      experience: 6,
      specialization: ['Luxury Villas', 'Waterfront', 'Condos'],
      languages: ['English', 'Spanish'],
      socialLinks: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      },
      featured: false
    },
    isActive: true
  },
  {
    name: 'David Wilson',
    email: 'david@riveryra.com',
    password: 'password123',
    phone: '+1 (555) 456-7890',
    role: 'agent',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    bio: 'First-Time Home Specialist with 5+ years of experience helping families find their dream homes.',
    location: 'Austin, TX',
    rating: 4.7,
    totalSales: 156,
    agentInfo: {
      licenseNumber: 'LIC' + Math.floor(Math.random() * 1000000),
      experience: 5,
      specialization: ['First-Time Buyers', 'Family Homes', 'Suburban'],
      languages: ['English'],
      socialLinks: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      },
      featured: false
    },
    isActive: true
  },
  {
    name: 'Priya Patel',
    email: 'priya@riveryra.com',
    password: 'password123',
    phone: '+1 (555) 567-8901',
    role: 'agent',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    bio: 'Investment Property Advisor with 10+ years of experience in multi-family properties.',
    location: 'Seattle, WA',
    rating: 4.9,
    totalSales: 278,
    agentInfo: {
      licenseNumber: 'LIC' + Math.floor(Math.random() * 1000000),
      experience: 10,
      specialization: ['Investment', 'Rental', 'Multi-Family'],
      languages: ['English', 'Hindi'],
      socialLinks: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      },
      featured: false
    },
    isActive: true
  },
  {
    name: 'James Miller',
    email: 'james@riveryra.com',
    password: 'password123',
    phone: '+1 (555) 678-9012',
    role: 'agent',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    bio: 'Land & Development Expert with 15+ years of experience in commercial development.',
    location: 'Denver, CO',
    rating: 4.8,
    totalSales: 189,
    agentInfo: {
      licenseNumber: 'LIC' + Math.floor(Math.random() * 1000000),
      experience: 15,
      specialization: ['Land', 'Development', 'Commercial'],
      languages: ['English'],
      socialLinks: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      },
      featured: false
    },
    isActive: true
  }
];

// Transform dummy properties to match Property schema
const dummyProperties = [
  {
    title: 'Modern Villa with Ocean View',
    description: 'Beautiful villa with stunning ocean views, pool, and modern amenities. Perfect for luxury living.',
    price: 850000,
    location: {
      address: '123 Beach Blvd',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139',
      country: 'USA'
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      garage: true,
      yearBuilt: 2020
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop', caption: 'Front view' }
    ],
    propertyType: 'house',
    status: 'for-sale',
    featured: true
  },
  {
    title: 'Downtown Luxury Apartment',
    description: 'Modern apartment in the heart of downtown with gym access and concierge service.',
    price: 450000,
    location: {
      address: '456 Downtown St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      garage: false,
      yearBuilt: 2019
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop', caption: 'Living room' }
    ],
    propertyType: 'apartment',
    status: 'for-sale',
    featured: false
  },
  {
    title: 'Family Home in Suburbs',
    description: 'Spacious family home with large garden, perfect for raising children. Pet friendly neighborhood.',
    price: 650000,
    location: {
      address: '789 Suburb Ln',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA'
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      garage: true,
      yearBuilt: 2015
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop', caption: 'Front view' }
    ],
    propertyType: 'house',
    status: 'for-sale',
    featured: true
  },
  {
    title: 'Modern Loft Studio',
    description: 'Industrial style loft in the arts district. Perfect for artists or young professionals.',
    price: 320000,
    location: {
      address: '321 Arts District',
      city: 'Portland',
      state: 'OR',
      zipCode: '97205',
      country: 'USA'
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      area: 900,
      garage: false,
      yearBuilt: 2018
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop', caption: 'Interior' }
    ],
    propertyType: 'apartment',
    status: 'for-sale',
    featured: false
  },
  {
    title: 'Luxury Penthouse Suite',
    description: 'Stunning penthouse with panoramic city views, rooftop terrace, and luxury finishes throughout.',
    price: 1200000,
    location: {
      address: '789 Skyline Dr',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      area: 2800,
      garage: true,
      yearBuilt: 2021
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop', caption: 'Living area' }
    ],
    propertyType: 'apartment',
    status: 'for-sale',
    featured: true
  },
  {
    title: 'Cozy Cottage Retreat',
    description: 'Charming mountain cottage with fireplace, perfect for weekend getaways or full-time living.',
    price: 275000,
    location: {
      address: '456 Mountain Rd',
      city: 'Denver',
      state: 'CO',
      zipCode: '80201',
      country: 'USA'
    },
    features: {
      bedrooms: 2,
      bathrooms: 1,
      area: 1100,
      garage: false,
      yearBuilt: 1985
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop', caption: 'Exterior' }
    ],
    propertyType: 'house',
    status: 'for-sale',
    featured: false
  }
];

const migrateData = async () => {
  try {
    console.log('\n🔄 Starting migration...\n');
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\nClearing existing data...');
    await Property.deleteMany({});
    await User.deleteMany({ role: 'agent' });
    console.log('✅ Existing data cleared');

    // Insert agents
    console.log('\nInserting agents...');
    const agents = await User.insertMany(dummyAgents);
    console.log(`✅ Inserted ${agents.length} agents`);

    // Assign properties to agents (distribute randomly)
    const propertiesWithAgents = dummyProperties.map(property => ({
      ...property,
      agent: agents[Math.floor(Math.random() * agents.length)]._id
    }));

    // Insert properties
    console.log('Inserting properties...');
    const properties = await Property.insertMany(propertiesWithAgents);
    console.log(`✅ Inserted ${properties.length} properties`);

    // Update agents with their property references
    console.log('Updating agent property references...');
    for (const agent of agents) {
      const agentProperties = properties.filter(p => 
        p.agent.toString() === agent._id.toString()
      ).map(p => p._id);
      
      agent.properties = agentProperties;
      await agent.save();
    }
    console.log('✅ Updated agents with property references');

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📊 Database Summary:');
    console.log(`   - Agents: ${agents.length}`);
    console.log(`   - Properties: ${properties.length}`);
    
    // Display sample data
    console.log('\n📋 Sample Agent:');
    console.log(`   Name: ${agents[0].name}`);
    console.log(`   Email: ${agents[0].email}`);
    console.log(`   Properties: ${agents[0].properties.length}`);
    
    console.log('\n📋 Sample Property:');
    console.log(`   Title: ${properties[0].title}`);
    console.log(`   Price: $${properties[0].price}`);
    console.log(`   Location: ${properties[0].location.city}, ${properties[0].location.state}`);

    console.log('\n🔐 Agent Login Credentials (for testing):');
    agents.forEach((agent, index) => {
      console.log(`   ${index + 1}. ${agent.name} - Email: ${agent.email} | Password: password123`);
    });

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    if (error.name === 'ValidationError') {
      console.error('\nValidation Error Details:');
      Object.keys(error.errors).forEach(key => {
        console.error(`   - ${key}: ${error.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

migrateData();