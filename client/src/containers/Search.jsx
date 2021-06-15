import React, {useState} from 'react';
import SearchField from '../components/SearchField';
import SearchResults from '../components/SearchResults';

const Search = () => {
  const [search, setSearch] = useState('');
  
  const onSearchHandler = async (string) => {
    const trackRes = await fetch('https://api.soundcloud.com/tracks?q=' + string);
    const trackData = await trackRes.json();

    console.log(trackData);
  }

  return (
    <div className="overflow-y-scroll scrollbar-hide col-span-8 grid-cols-12">
      <SearchField handler={onSearchHandler} />
      <SearchResults type="Songs" />
      <SearchResults type="Artists" />
      <SearchResults type="Playlists" />
    </div>
  )
}

export default Search;
