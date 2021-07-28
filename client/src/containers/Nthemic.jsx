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
import Collection from './Collection';
import Sidenav from '../components/Sidenav';
import MusicBar from '../components/MusicBar';

const Nthemic = ({ code }) => {
  const accessToken = useAuth(code);

  // Item can be a track, album or playlist
  // item is an object, { item: (item), index: (index) }
  // Index being track position in album or playlist
  const [currentItem, setCurrentItem] = useState({ item: null, index: null });

  const play = (item, index = 0) => {
    setCurrentItem({ item: item, index: index })
  }

  return accessToken ? (
    <Router>
      <AuthCodeContext.Provider value={accessToken}>
        <div className="h-screen font-sans text-gray-200 bg-gray-900 grid-rows-custom grid grid-cols-10">
          <Sidenav />
          <div className="overflow-y-scroll scrollbar-hide col-span-8 grid-cols-12">
            <Switch>
              <Route exact path="/" render={() => <Home play={play} />} />
              <Route path="/search" render={() => <Search play={play} />} />
              <Route path="/settings" component={Settings} />
              <Route path="/collection/:type/:id" component={() => <Collection play={play} />} />
            </Switch>
          </div>
          <MusicBar currentItem={currentItem} />
        </div>
      </AuthCodeContext.Provider>
    </Router>
  ) : null
}

export default Nthemic
