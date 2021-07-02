import React, { useContext, useEffect, useState} from 'react';
import Header from '../components/Header';
import FeaturedBar from '../components/FeaturedBar';
import AuthCodeContext from '../context/AuthCodeContext';
import SpotifyWebApi from 'spotify-web-api-node';

const Home = ({ play }) => {
  const accessToken = useContext(AuthCodeContext);

  const [topTracks, setTopTracks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [featuredPlaylist, setFeaturedPlaylist] = useState();
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  const spotifyApi = new SpotifyWebApi({
    clientId: '11c9d0da629948fb87a800307b571162',
  })

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    // Get user's top tracks
    spotifyApi.getMyTopTracks({ limit : 10 })
      .then(data => {
        console.log(data.body);
        setTopTracks(data.body.items.map(track => ({
          id: track.id,
          uri: track.uri,
          name: track.name,
          album: track.album.name,
          type: track.type,
          artist: track.artists[0].name,
          albumCoverLG: track.album.images[1].url,
          albumCoverSM: track.album.images[2].url,
          duration: track.duration_ms
        })))  
      })
      .catch(err => console.log(err));


    // Get new releases
    spotifyApi.getNewReleases({ limit : 10 })
      .then(data => {
        console.log(data.body);
        setNewReleases(data.body.albums.items.map(album => ({
          id: album.id,
          uri: album.uri,
          album: album.name,
          type: album.type,
          artist: album.artists[0].name,
          albumCoverLG: album.images[1].url,
          albumCoverSM: album.images[2].url,
        })))
      })
      .catch(err => console.log(err));

    spotifyApi.getFeaturedPlaylists({ limit : 11 })
      .then(data => {
        console.log(data.body);
        const playlists = data.body.playlists.items.map(playlist => ({
          id: playlist.id,
          uri: playlist.uri,
          type: playlist.type,
          name: playlist.name,
          description: playlist.description,
          albumCoverLG: playlist.images[0].url,
        }))

        setFeaturedPlaylist(playlists[0]);
        setFeaturedPlaylists(playlists.slice(1));
      })
      .catch(err => console.log(err));


  }, [accessToken])

  return featuredPlaylist ? (
    <div className="overflow-y-scroll border-b border-gray-700 scrollbar-hide col-span-8 grid-cols-12">
      <Header playlist={featuredPlaylist} play={play} />
      <div className="p-4">
        <FeaturedBar title="Your Top Tracks" items={topTracks} play={play} />
        <FeaturedBar title="New music" items={newReleases} play={play} />
        <FeaturedBar title="Featured Playlists"  items={featuredPlaylists} play={play} />
      </div>
    </div>
  ) : null
}

export default Home;
