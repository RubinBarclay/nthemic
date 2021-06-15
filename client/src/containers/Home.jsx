import React from 'react';
import Header from '../components/Header';
import FeaturedBar from '../components/FeaturedBar';

const Home = () => {
  return (
    <div className="overflow-y-scroll scrollbar-hide col-span-8 grid-cols-12">
      <Header />
      <div className="p-4">
        <FeaturedBar title="New music" />
        <FeaturedBar title="Trending tracks" />
        <FeaturedBar title="Rap & RnB" />
      </div>
    </div>
  )
}

export default Home;
