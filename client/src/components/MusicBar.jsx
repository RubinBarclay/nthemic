import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthCodeContext from '../context/AuthCodeContext';
import ProgressBar from '../components/ProgressBar';
// import SpotifyWebApi from 'spotify-web-api-node';
// import axios from 'axios';
import { 
  PlayIcon, 
  PauseIcon, 
  RewindIcon, 
  FastForwardIcon 
} from '@heroicons/react/solid'

const MusicBar = ({ track }) => {
  const accessToken = useContext(AuthCodeContext);

  const [playing, setPlaying] = useState(false);

  const [trackInfo, setTrackInfo] = useState();

  const [deviceID, setDeviceID] = useState();

  const [display, setDisplay] = useState(false);

  // const [player, setPlayer] = useState();

  // let player;
  let player = useRef();

  useEffect(() => {
    if (!window.Spotify) return;

    player.current = new window.Spotify.Player({
      name: 'Nthemic Music Player',
      getOAuthToken: callback => {
        callback(accessToken)
      },
      volume: 0.5
    })

    console.log('[PLAYER]', player)

    player.current.addListener('ready', ({ device_id }) => {
      console.log('[DEVICE_ID]', device_id)
      setDeviceID(device_id);
    }) 

    player.current.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!')
        setDisplay(true);
      } else {
        console.log('[ERROR] The Web Playback SDK failed to connect to Spotify')
      }
    })

    // Disconnect player when access token changes
    return () => player.current.disconnect();
  }, [accessToken])

  // Set track info when selecting new track
  useEffect(() => {
    setTrackInfo(track)
  }, [track])

  // Play track immediately when selected
  useEffect(() => {
    // if (!deviceID) return;
    if (!trackInfo) return;
    if (!player.current) return;

    playTrack({ spotify_uri: trackInfo.uri, playerInstance: player.current });

  }, [trackInfo])

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
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };

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

  return display && trackInfo ? (
    <div className="relative flex items-center justify-center w-screen h-20 bg-gray-900"> {/* border-t border-gray-800"> */}
      <ProgressBar duration={trackInfo.duration} playing={playing} />
      <img className="w-16 h-14" src={trackInfo?.albumURL} alt={trackInfo?.title} />
      <div className="px-6 text-center">
        <p>{trackInfo?.title}</p>
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
