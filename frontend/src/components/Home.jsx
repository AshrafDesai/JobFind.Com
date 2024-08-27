import React from 'react';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel'; 
import LatestJobs from './LatestJobs'
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  );
};

export default Home;
