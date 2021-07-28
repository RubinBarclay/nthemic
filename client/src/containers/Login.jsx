import React from 'react';

const Login = () => {
  const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=11c9d0da629948fb87a800307b571162&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
  // const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=11c9d0da629948fb87a800307b571162&response_type=code&redirect_uri=https://nthemic.herokuapp.com/&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

  return (
    <div className="flex items-center justify-center h-screen font-sans text-gray-200 bg-gray-900">
      <a href={AUTH_URL} className="px-8 py-4 text-xl bg-purple-500 border-none rounded-full">Login with Spotify</a>
    </div>
  ) 
}

export default Login
