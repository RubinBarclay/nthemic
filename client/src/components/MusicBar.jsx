import React, { useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import AuthCodeContext from '../context/AuthCodeContext';
import { 
  PlayIcon, 
  PauseIcon, 
  RewindIcon, 
  FastForwardIcon 
} from '@heroicons/react/solid'

const MusicBar = ({ trackUri }) => {
  const accessToken = useContext(AuthCodeContext);

  // return accessToken ? (
  //   <SpotifyPlayer 
  //     token={accessToken}  
  //     uris={trackUri ? [trackUri] : []}
  //     showSaveIcon />
  // ) : null;

  return (
    <div className="flex items-center justify-center w-screen h-20 bg-gray-900 border-t border-gray-800">
      <div className="w-16 bg-red-500 h-14"></div>
      <div className="px-6 text-center">
        <p>To Breathe in a Casket</p>
        <p className="text-sm text-gray-400">Necrophagist</p>
      </div>
      <RewindIcon className="w-8 h-8" />
      <PlayIcon className="w-10 h-10" />
      {/* <RewindIcon className="w-10 h-10" /> */}
      <FastForwardIcon className="w-8 h-8" />
    </div>
  )
}

export default MusicBar;
