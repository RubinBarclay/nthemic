import React from 'react';
// import testImage from '../assets/img/flamingo-pool.jpg';

const Header = ({ playlist, play }) => {
  return (
    // Gradient background is generated with Grade.js, the gradient-wrap class does the magic
    // TRY: Use img as background image with filters as background image, you can use Grade.js elsewhere
    <div className="relative flex items-center overflow-hidden h-1/2">
      <img className="absolute z-0 w-full pointer-events-none filter blur brightness-85" src={playlist.albumCoverLG} alt="background image"/>
      <img className="z-10 ml-40 mr-8 bg-red-200 w-72 h-72" src={playlist.albumCoverLG} alt="album cover"/> 
      <div className="z-10 text-white">
        {/*<h2 className="text-5xl">{playlist.name}</h2> */}
        <h3 className="w-2/3 my-2 text-4xl">{playlist.description.replace(/Cover:.*$/, '')}</h3>
        <button 
          onClick={() => play(playlist)} 
          className="px-6 py-3 my-2 text-xl bg-transparent border-2 border-white rounded-full transform transition duration-150 hover:scale-105"
          className="px-6 py-3 text-xl bg-transparent border-2 border-gray-200 rounded-full hover:bg-gray-200 hover:text-gray-900 transition-colors whitespace-nowrap">
          Listen now
        </button>
      </div>
    </div>
  )
}

export default Header;

