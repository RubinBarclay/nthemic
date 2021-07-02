import React, { useState } from 'react';
import { PlayIcon } from '@heroicons/react/solid';

const SearchResult = ({ play, track}) => {
  const [hover, setHover] = useState(false);

  const displayDuration = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div 
      className="flex items-center my-2 cursor-pointer" 
      onMouseOver={() => setHover(true)} 
      onMouseOut={() => setHover(false)} 
      onClick={() => play(track)}>
      <img className="w-20 h-auto bg-red-500" src={track.albumCoverSM} alt={track.name} />
      <div className="px-2 mb-2">
        <p className="text-xl">{track.name}</p>
        <p className="text-lg text-gray-400">{track.artist}</p>
      </div>
      {
        hover
        ? <PlayIcon className="w-12 h-12 ml-auto" /> 
        : <span className="px-2 ml-auto text-lg">{displayDuration(track.duration)}</span>
      }
    </div>
  )
}

export default SearchResult;
