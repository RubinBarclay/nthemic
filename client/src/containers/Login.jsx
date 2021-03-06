import React, { useEffect, useState } from 'react';
import Bowser from 'bowser';

const Login = () => {
  // const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=11c9d0da629948fb87a800307b571162&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
  const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=11c9d0da629948fb87a800307b571162&response_type=code&redirect_uri=https://nthemic.herokuapp.com/&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

  const [message, setMessage] = useState('');
  const [displayBtn, setDisplayBtn] = useState(true);

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);

    // If browser is not desktop Chrome or Edge don't display login button
    if (!browser.satisfies({ desktop: { chrome: ">60", edge: ">79" } })) {
      setDisplayBtn(false);
      setMessage(
        <p className="w-4/5 py-10 text-lg xl:w-1/4 lg:w-1/3 sm:w-1/2">
          The Spotify Web Playback SDK currently does not 
          support your browser. Please try using the desktop
          version of Google Chrome or Microsoft Edge.
        </p> 
      )
    }

    if (new RegExp('error').test(window.location.href)) {
      setMessage(
        <p className="w-4/5 py-10 text-lg xl:w-1/4 lg:w-1/3 sm:w-1/2">
          An error occured during the authentication process.
          You must have Spotify Premium in order to use this app,
          or it could be a temporary problem with Spotify's servers.
        </p> 
      )
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans text-center text-gray-200 bg-gray-900">
      { message }
      { displayBtn ? <a href={AUTH_URL} className="px-8 py-4 text-xl bg-purple-500 border-none rounded-full">Login with Spotify</a> : null }
    </div>
  )
}

export default Login
