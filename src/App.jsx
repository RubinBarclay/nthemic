import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './containers/Home';
import Search from './containers/Search';
import Sidenav from './components/Sidenav';
import MusicBar from './components/MusicBar';

const App = () => {
  return (
    <Router>
      <div className="h-screen bg-gray-900 grid grid-cols-12">
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

export default App
