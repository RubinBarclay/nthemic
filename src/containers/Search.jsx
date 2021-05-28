import React from 'react';
import SearchField from '../components/SearchField';
import SearchResults from '../components/SearchResults';
import { PlayIcon } from '@heroicons/react/solid';

const Search = () => {
  return (
    <div className="overflow-y-scroll scrollbar-hide col-span-8 grid-cols-12">
      <SearchField />
      <SearchResults type="Songs" />
      <SearchResults type="Artists" />
      <SearchResults type="Playlists" />
    </div>
  )
}

export default Search;
