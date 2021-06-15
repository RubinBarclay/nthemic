import React, { useEffect } from 'react';
import useAuth from '../customHooks/useAuth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Home';
import Search from './Search';
import Sidenav from '../components/Sidenav';
import MusicBar from '../components/MusicBar';

const Nthemic = (code) => {
  const accessToken = useAuth(code);

  useEffect(() => console.log('Access Token: ', accessToken));

  return (
    <Router>
      <div className="h-screen font-sans text-gray-200 bg-gray-900 grid-rows-custom grid grid-cols-10">
        <Sidenav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
        </Switch>
        <MusicBar />
      </div>
    </Router>
  )
}

export default Nthemic

