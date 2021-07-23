import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = ({ type, results, play }) => (
  <div className="flex flex-col items-center p-8 pb-0">
    <div className="w-3/5">
      <h2 className="text-2xl">{type}</h2>
      {
        results.map(track => <SearchResult key={track.id} play={play} track={track} />)
      }
    </div>
  </div>
)

export default SearchResults;
