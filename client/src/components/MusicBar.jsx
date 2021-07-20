import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthCodeContext from '../context/AuthCodeContext';
import ProgressBar from '../components/ProgressBar';
import SpotifyWebApi from 'spotify-web-api-node';
import { 
  PlayIcon, 
  PauseIcon, 
  RewindIcon, 
  FastForwardIcon 
} from '@heroicons/react/solid'

const MusicBar = ({ item }) => {

  const accessToken = useContext(AuthCodeContext);

  const [playing, setPlaying] = useState(false);
  const [trackInfo, setTrackInfo] = useState();
  const [trackList, setTrackList] = useState([]);
  const [globalDeviceID, setGlobalDeviceID] = useState();
  const [progressState, setProgressState] = useState('0%');
  const [display, setDisplay] = useState(false);

  // State that need to persist between renders
  let player = useRef();
  let trackIndex = useRef(0);

  const spotifyApi = new SpotifyWebApi({
    clientId: '11c9d0da629948fb87a800307b571162',
  })

  // Initiate Spotify Web Playback SDK
  useEffect(() => {
    if (!accessToken) return;
    if (!window.Spotify) return;

    player.current = new window.Spotify.Player({
      name: 'Nthemic Music Player',
      getOAuthToken: callback => {
        callback(accessToken)
      },
      volume: 0.25
    })

    player.current.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!')
      } else {
        console.log('[ERROR] The Web Playback SDK failed to connect to Spotify')
      }
    })

    player.current.addListener('ready', ({ device_id }) => {
      setGlobalDeviceID(device_id);
    }) 

    // Disconnect player when access token changes
    return () => player.current.disconnect();
  }, [accessToken])

  // Set track info when selecting new track/album
  useEffect(() => {
    if (!item) return;
    if (!accessToken) return;

    console.log('SETTING TRACKINFO: ', item)

    spotifyApi.setAccessToken(accessToken);

    switch (item.type) {
      case 'track':
        setTrackInfo(item);
        setTrackList([item]);
        break;

      case 'album':
        spotifyApi.getAlbumTracks(item.id)
          .then(data => {
            const extractTrackInfo = (track) => ({
              ...item,
              id: track.id,
              uri: track.uri,
              name: track.name,
              duration: track.duration_ms,
            })

            console.log(data.body.items.map(extractTrackInfo))
            console.log(data.body.items[0])

            // Set info for first track
            setTrackInfo(extractTrackInfo(data.body.items[0]));

            // Add all tracks in album to array
            setTrackList(data.body.items.map(extractTrackInfo));
          })
          .catch(err => console.log(err))
        break;

      case 'playlist':
        spotifyApi.getPlaylistTracks(item.id)
          .then(data => {
            const extractTrackInfo = (track) => ({
              ...item,
              id: track.track.id,
              uri: track.track.uri,
              name: track.track.name,
              album: track.track.album.name,
              artist: track.track.artists[0].name,
              duration: track.track.duration_ms,
              albumCoverLG: track.track.album.images[1].url,
              albumCoverSM: track.track.album.images[2].url
            })

            console.log(data.body.items.map(extractTrackInfo))
            console.log(data.body.items[0])

            // Set info for first track
            setTrackInfo(extractTrackInfo(data.body.items[0]));

            // Add all tracks in playlist to array
            setTrackList(data.body.items.map(extractTrackInfo));
          })
          .catch(err => console.log(err))
        break;

      default:
        console.log('[ERROR] Unknown item type');
        console.log('item.type: ', item.type);
    }
  }, [item])

  // Play track immediately when selected
  useEffect(() => {
    if (!trackInfo) return;
    if (!player.current) return;

    // Reset track index for trackList
    trackIndex.current = 0;

    // Play track once trackInfo and trackList is set
    playTrack({
      spotify_uri: trackInfo.uri,
      playerInstance: player.current 
    });

    setDisplay(true); 
  }, [trackList]) // Only run when new trackList is changed

  // Play track from spotify Web API
  const playTrack = ({
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
      }
    }
  }) => {
    setPlaying(true);
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${globalDeviceID}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };

  // Track navigation controls 

  const togglePlay = () => {
    player.current.togglePlay().then(() => {
      setPlaying(prevState => !prevState)
    })
  }

  const prevTrack = () => {
    // Decrement trackIndex every time nextTrack() is run
    // and store it in a easier to read variable
    const index = trackIndex.current - 1;
    trackIndex.current = trackIndex.current - 1;

    // If track not first in trackList play previous track
    if (index >= 0) {
      playTrack({
        spotify_uri: trackList[index].uri,
        playerInstance: player.current 
      });

      setTrackInfo(trackList[index]);
    } else { // else restart first track 
      playTrack({
        spotify_uri: trackList[0].uri,
        playerInstance: player.current 
      });

      setTrackInfo(trackList[0]);
    }
  }

  const nextTrack = () => {
    // Increment trackIndex every time nextTrack() is run
    // and store it in a easier to read variable
    const index = trackIndex.current + 1;
    trackIndex.current = trackIndex.current + 1;


    // If track not last in trackList play next track
    if (index < trackList.length) {
      playTrack({
        spotify_uri: trackList[index].uri,
        playerInstance: player.current 
      });

      setTrackInfo(trackList[index]);
    } else { // else pause track and go to end
      player.current.pause();
      setPlaying(false);
      setProgressState('100%');
    }
  }

  return display ? (
    <div className="relative flex items-center justify-center w-screen h-20 bg-gray-900">
      <ProgressBar 
        track={trackInfo} 
        trackList={trackList}
        playing={playing} 
        setPlaying={setPlaying}
        progressState={progressState}
        setProgressState={setProgressState}
        nextTrack={nextTrack}
        player={player.current} /> 
      <img className="w-16 h-14" src={trackInfo?.albumCoverSM} alt={trackInfo?.name} />
      <div className="px-6 text-center">
        <p>{trackInfo?.name}</p>
        <p className="text-sm text-gray-400">{trackInfo?.artist}</p>
      </div>
      <RewindIcon className="w-8 h-8" onClick={prevTrack}/>
      <div onClick={togglePlay}>
        { playing ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10" /> }
      </div>
      <FastForwardIcon className="w-8 h-8" onClick={nextTrack} />
    </div>
  ) : null
}

export default MusicBar;
