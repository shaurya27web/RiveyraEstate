import React, { useState, useEffect } from 'react';
import { getFeaturedProperties } from '../../services/api';
import Hero from '../../components/common/home/Hero/Hero';
import Credibility from '../../components/common/home/Credibility/Credibility';
import PhotoGallery from '../../components/common/home/PhotoGallery/PhotoGallery';
import FeaturedProperties from '../../components/common/home/Hero/FeaturedProperties/FeaturedProperties';
import './Home.css';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await getFeaturedProperties();
      setFeaturedProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Hero />
      <Credibility />
      <FeaturedProperties properties={featuredProperties} loading={loading} />
      <PhotoGallery />
    </div>
  );
};

export default Home;