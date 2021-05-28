import React from 'react';
import testImage from '../assets/img/flamingo-pool.jpg';

const Header = () => {

  return (
    // Gradient background is generated with Grade.js, the gradient-wrap class does the magic
    // TRY: Use img as background image with filters as background image, you can use Grade.js elsewhere
    <div className="relative flex items-center pl-40 gradient-wrap w-100 h-1/2">
      <img className="mr-8 bg-red-200 w-80 h-80" src={testImage} alt="album cover"/> 
      <div className="text-white">
        <h2 className="text-5xl">Spring Tunes</h2>
        <h3 className="my-2 text-4xl">Best tracks this season</h3>
        <button className="px-6 py-3 my-2 text-xl bg-transparent border-2 border-white rounded-full transform transition duration-150 hover:scale-105">
          Listen now
        </button>
      </div>
    </div>
  )
}

export default Header;

