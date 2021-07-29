import React from 'react';

const Login = () => {
  const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=11c9d0da629948fb87a800307b571162&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
  // const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=11c9d0da629948fb87a800307b571162&response_type=code&redirect_uri=https://nthemic.herokuapp.com/&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans text-center text-gray-200 bg-gray-900">
      { 
        new RegExp('error').test(window.location.href) ? (
          <p className="py-10 text-lg">
            An error occured during the authentication process.<br />
            You must have Spotify Premium in order to use this app,<br />
            or it could be a temporary problem with Spotify's servers.<br />
          </p> 
        ) : null 
      }
      <a href={AUTH_URL} className="px-8 py-4 text-xl bg-purple-500 border-none rounded-full">Login with Spotify</a>
    </div>
  ) 
}

export default Login
