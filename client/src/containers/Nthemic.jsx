import React, { useEffect, useState } from 'react';
import useAuth from '../customHooks/useAuth';
import AuthCodeContext from '../context/AuthCodeContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Home';
import Search from './Search';
import Sidenav from '../components/Sidenav';
import MusicBar from '../components/MusicBar';
// import SpotifyPlayer from 'react-spotify-web-playback';

const Nthemic = ({ code }) => {
  const accessToken = useAuth(code);
  const [currentTrack, setCurrentTrack] = useState();

  useEffect(() => {
    console.log(currentTrack)
  }, [currentTrack])

  return accessToken ? (
    <Router>
      <AuthCodeContext.Provider value={accessToken}>
        <div className="h-screen font-sans text-gray-200 bg-gray-900 grid-rows-custom grid grid-cols-10">
          <Sidenav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" render={() => <Search play={setCurrentTrack} />} />
          </Switch>
          <MusicBar track={currentTrack} /> 
        </div>
      </AuthCodeContext.Provider>
    </Router>
  ) : null // <-- this will be a loading component
}

export default Nthemic
