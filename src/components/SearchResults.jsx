import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = (props) => {
  const results = [
    { title: 'To Breate in a Casket', artist: 'Necrophagist', duration: '4.23' },
    { title: 'To Breate in a Casket', artist: 'Necrophagist', duration: '4.23' },
    { title: 'To Breate in a Casket', artist: 'Necrophagist', duration: '4.23' },
    { title: 'To Breate in a Casket', artist: 'Necrophagist', duration: '4.23' },
    { title: 'To Breate in a Casket', artist: 'Necrophagist', duration: '4.23' },
  ]

  return (
    <div className="flex flex-col items-center p-12 pb-0">
      <div className="w-3/5">
        <h2 className="text-2xl">{props.type}</h2>
        {
          results.map(song => <SearchResult {...song} />)
        }
      </div>
    </div>
  )
}

export default SearchResults;
