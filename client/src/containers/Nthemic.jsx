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
import Settings from './Settings';
import Sidenav from '../components/Sidenav';
import MusicBar from '../components/MusicBar';

const Nthemic = ({ code }) => {
  const accessToken = useAuth(code);

  // Item can be a track, album or playlist
  const [currentItem, setCurrentItem] = useState();

  useEffect(() => {
    console.log('CurrentItem: ', currentItem)
  }, [currentItem])

  return accessToken ? (
    <Router>
      <AuthCodeContext.Provider value={accessToken}>
        <div className="h-screen font-sans text-gray-200 bg-gray-900 grid-rows-custom grid grid-cols-10">
          <Sidenav />
          <Switch>
            <Route exact path="/" render={() => <Home play={setCurrentItem} />} />
            <Route path="/search" render={() => <Search play={setCurrentItem} />} />
            <Route path="/settings" component={Settings} />
          </Switch>
          <MusicBar item={currentItem} />
        </div>
      </AuthCodeContext.Provider>
    </Router>
  ) : null // <-- this will be a loading component
}

export default Nthemic
