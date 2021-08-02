import React from 'react';

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen font-sans text-gray-200 bg-gray-900">
      <p className="text-white">An error occured during login, this is most likely a problem with Spotify's Web API. You can try again later.</p>
      <a href={AUTH_URL} className="px-8 py-4 text-xl bg-purple-500 border-none rounded-full">Login with Spotify</a>
    </div>
  ) 
}

export default Error;
