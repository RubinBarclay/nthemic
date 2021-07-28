import React, { useContext, useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import SearchField from '../components/SearchField';
import SearchResults from '../components/SearchResults';
import AuthCodeContext from '../context/AuthCodeContext';

const Search = ({ play }) => {
  const accessToken = useContext(AuthCodeContext);
  const [search, setSearch] = useState('');
  const [trackResults, setTrackResults] = useState(null);
  const [albumResults, setAlbumResults] = useState(null);
  const [playlistResults, setPlaylistResults] = useState(null);

  const spotifyApi = new SpotifyWebApi({
    clientId: '11c9d0da629948fb87a800307b571162',
  })

  const reset = () => {
    setTrackResults(null);
    setAlbumResults(null);
    setPlaylistResults(null);
  }

  useEffect(() => {
    if (!search) return reset();
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.searchTracks(search, { limit: 6 }).then(data => {
      if (cancel) return;
      setTrackResults(data.body.tracks.items.map(track => ({
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

    spotifyApi.searchAlbums(search, { limit: 6 }).then(data => {
      if (cancel) return;
      setAlbumResults(data.body.albums.items.map(album => ({
        id: album.id,
        uri: album.uri,
        type: album.type,
        name: album.name,
        artist: album.artists[0].name,
        collectionID: album.id,
        albumCoverSM: album.images[2].url,
        albumType: album.album_type,
      })))
    })

    spotifyApi.searchPlaylists(search, { limit: 6 }).then(data => {
      if (cancel) return;
      setPlaylistResults(data.body.playlists.items.map(playlist => ({
        id: playlist.id,
        uri: playlist.uri,
        type: playlist.type,
        name: playlist.name,
        collectionID: playlist.id,
        albumCoverSM: playlist.images[0].url,
      })))
    })
    
    return () => cancel = true;
  }, [search, accessToken])

  return (
    <div className="w-full h-full">
      <SearchField setSearch={setSearch} />
      { trackResults ? <SearchResults type="Songs" results={trackResults} play={play} /> : null }
      { albumResults ? <SearchResults type="Albums" results={albumResults} play={play} /> : null }
      { playlistResults ? <SearchResults type="Playlists" results={playlistResults} play={play} /> : null }
    </div>
  )
}

export default Search;
