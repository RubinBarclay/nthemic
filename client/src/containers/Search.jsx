import React, { useContext, useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import SearchField from '../components/SearchField';
import SearchResults from '../components/SearchResults';
import AuthCodeContext from '../context/AuthCodeContext';

const Search = () => {
  const accessToken = useContext(AuthCodeContext);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const spotifyApi = new SpotifyWebApi({
    clientId: '11c9d0da629948fb87a800307b571162',
  })

  // useEffect(() => {
  //   if (!accessToken) return;
  //   console.log(accessToken);
  //   spotifyApi.setAccessToken(accessToken);
  // }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    spotifyApi.setAccessToken(accessToken);

    let cancel = false;
    spotifyApi.searchTracks(search).then(res => {
      console.log(res);
      if (cancel) return;
      setSearchResults(res.body.tracks.items.map(track => ({
        id: track.id,
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumURL: track.album.images[2].url
      })))
    })

    return () => cancel = true;
  }, [search, accessToken])

  const playSong = () => {

  }

  return (
    <div className="overflow-y-scroll scrollbar-hide col-span-8 grid-cols-12">
      <SearchField setSearch={setSearch} />
      <SearchResults type="Songs" results={searchResults} playSong={playSong} />
      {/* <SearchResults type="Artists" />
      <SearchResults type="Playlists" /> */}
    </div>
  )
}

export default Search;
