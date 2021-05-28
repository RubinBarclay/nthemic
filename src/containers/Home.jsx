import React from 'react';
import Header from '../components/Header';
import FeaturedBar from '../components/FeaturedBar';

const Home = () => {
  return (
    <div className="col-span-8 grid-cols-12 auto-rows-min">
      <Header />
      <FeaturedBar title="New and trending" />
    </div>
  )
}

export default Home;
