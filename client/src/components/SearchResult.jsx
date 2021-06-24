import React from 'react';
import { PlayIcon } from '@heroicons/react/solid';

const SearchResult = ({ play, track}) => (
  <div className="flex items-center my-2 cursor-pointer" onClick={() => play(track)}>
    <img className="w-24 h-20 bg-red-500" src={track.albumURL} alt={track.title} />
    <div className="px-2 mb-2">
      <p className="text-xl">{track.title}</p>
      <p className="text-lg text-gray-400">{track.artist}</p>
    </div>
    <PlayIcon className="w-12 h-12 ml-auto" />
    {/* <span className="px-2 text-lg">{track.duration}</span> */}
  </div>
)

export default SearchResult;
