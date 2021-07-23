import React, { useContext, useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import SearchField from '../components/SearchField';
import SearchResults from '../components/SearchResults';
import AuthCodeContext from '../context/AuthCodeContext';

const Search = ({ play }) => {
  const accessToken = useContext(AuthCodeContext);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const spotifyApi = new SpotifyWebApi({
    clientId: '11c9d0da629948fb87a800307b571162',
  })

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    let cancel = false;
    spotifyApi.searchTracks(search).then(data => {
      console.log(data.body.tracks.items[0]);
      if (cancel) return;
      setSearchResults(data.body.tracks.items.map(track => ({
        id: track.id,
        uri: track.uri,
        name: track.name,
        type: track.type,
        collectionID: track.album.id,
        artist: track.artists[0].name,
        index: track.track_number - 1,
        albumCoverLG: track.album.images[2].url,
        albumCoverSM: track.album.images[2].url,
        duration: track.duration_ms
      })))
    })

    return () => cancel = true;
  }, [search, accessToken])

  return (
    <div className="w-full h-full">
      <SearchField setSearch={setSearch} />
      <SearchResults type="Songs" results={searchResults} play={play} />
      {/* <SearchResults type="Artists" />
      <SearchResults type="Playlists" /> */}
    </div>
  )
}

export default Search;
