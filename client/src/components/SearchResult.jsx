import React from 'react';
import { PlayIcon } from '@heroicons/react/solid';

const SearchResult = (props) => (
  <div className="flex items-center my-2 cursor-pointer">
    <div className="w-24 h-20 bg-red-500"></div>
    <div className="px-2 mb-2">
      <p className="text-xl">{props.title}</p>
      <p className="text-lg text-gray-400">{props.artist}</p>
    </div>
    <PlayIcon className="w-12 h-12 ml-auto" />
    <span className="px-2 text-lg">{props.duration}</span>
  </div>
)

export default SearchResult;
