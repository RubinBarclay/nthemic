import React, { useState } from 'react';
import { PlayIcon } from '@heroicons/react/solid';
import displayDuration from '../utilities/displayDuration';

const SearchResult = ({ play, track}) => {
  const [hover, setHover] = useState(false);

  return (
    <div 
      className="flex items-center my-2 cursor-pointer" 
      onMouseOver={() => setHover(true)} 
      onMouseOut={() => setHover(false)} 
      onClick={() => play(track)}>
      <div className="relative">
        <img className="w-20 h-auto bg-red-500" src={track.albumCoverSM} alt={track.name} />
        <div className={`absolute inset-0 flex justify-center bg-black bg-opacity-50 opacity-${hover ? 100 : 0} transition-opacity`}>
          <PlayIcon className="w-12 h-auto" />
        </div>
      </div>
      <div className="px-2 mb-2">
        <p className="text-xl">{track.name}</p>
        <p className="text-lg text-gray-400">{track.artist}</p>
      </div>
      <span className="px-2 ml-auto text-lg">{displayDuration(track.duration)}</span>
    </div>
  )
}

export default SearchResult;
