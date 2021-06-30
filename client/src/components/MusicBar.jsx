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
  // const [display, setDisplay] = useState(false);

  let player = useRef();

  const spotifyApi = new SpotifyWebApi({
    clientId: '11c9d0da629948fb87a800307b571162',
  })

  // ORDER OF USE EFFECTS IS THE CURRENT PROBLEM. try steps below
  // 1. initialiaze player
  // 2. set track info <-- you should be able to do this without re-initializing the player
  // 3. play song

  // Initiate Spotify Web Playback SDK
  useEffect(() => {
    // if (!trackInfo) return;
    if (!accessToken) return;
    if (!window.Spotify) return;

    console.log('CREATING PLAYER: ', item)

    player.current = new window.Spotify.Player({
      name: 'Nthemic Music Player',
      getOAuthToken: callback => {
        callback(accessToken)
      },
      volume: 0.45
    })

    player.current.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!')
      } else {
        console.log('[ERROR] The Web Playback SDK failed to connect to Spotify')
      }
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

    if (item.type === 'track') {
      setTrackInfo(item);
      setTrackList([item]);
    } else {
      spotifyApi.getAlbumTracks(item.id)
        .then(data => {

          const extractTrackInfo = (track) => ({
            ...item,
            id: track.id,
            name: track.name,
            duration: track.duration_ms,
            uri: track.uri,
            type: track.type,
          })

          // Add all tracks in album to array
          setTrackList(data.body.items.map(extractTrackInfo));

          // console.log(extractTrackInfo(data.body.items[0]))
          // console.log(data.body.items[0]);

          // Play first track of album
          setTrackInfo(extractTrackInfo(data.body.items[0]));
        })
        .catch(err => console.log(err))
    }
  }, [item])

  // Play track immediately when selected
  useEffect(() => {
    if (!trackInfo) return;
    if (!player.current) return;

    console.log(trackInfo)

    player.current.addListener('ready', ({ device_id }) => {
      // setDisplay(true); 
      setGlobalDeviceID(device_id);
      console.log('[DEVICE_ID]', device_id)

      // Play track immediately when selected
      playTrack({
        type: item.type, // tells function what type of uri to use
        deviceID: device_id,
        spotify_uri: item.uri, // passing original item uri (e.g. album instead of individual track uri)
        playerInstance: player.current 
      });
    }) 

    player.current.addListener('player_state_changed', state => {
      // console.log(state)

      if (!state) return;

      // console.log(item)
      // console.log(trackInfo)

      if (trackInfo.id !== state.track_window.current_track.id) {
        // Finds info about new (currently) playing track
        const newTrack = trackList.find(track => (
          track.id === state.track_window.current_track.id)
        ) 

        setTrackInfo(newTrack); // just set information, context_uri takes care of auto playing songs

        // Sets new track info and plays new track
        // setTrackInfo(newTrack);
        // playTrack({
        //   type: newTrack.type,
        //   spotify_uri: newTrack.uri, 
        //   playerInstance: player.current 
        // });
      }
    })

  }, [trackInfo])

  // Play track from spotify Web API
  const playTrack = ({
    type,
    deviceID,
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
      }
    }
  }) => {
    console.log(deviceID, globalDeviceID)

    // Sets context_uri for when type is albums or playlists 
    const options = type === 'track' 
      ? { uris: [spotify_uri] } 
      : { context_uri: spotify_uri }

    // Use deviceID from state if not passed as an argument
    const device_id = deviceID ? deviceID : globalDeviceID;

    setPlaying(true);
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        // body: JSON.stringify(options),
        body: JSON.stringify(options),
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken}`
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
    player.current.previousTrack()
  }

  const nextTrack = () => {
    player.current.nextTrack()
  }

  return true ? (
    <div className="relative flex items-center justify-center w-screen h-20 bg-gray-900">
      <ProgressBar 
        track={trackInfo} 
        trackList={trackList}
        playing={playing} 
        setPlaying={setPlaying}
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
