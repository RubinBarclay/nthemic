import React from 'react';
import { NavLink } from "react-router-dom";
import { 
  HomeIcon,
  SearchIcon,
  CogIcon
} from '@heroicons/react/solid'

const Sidenav = () => {
  return (
    <div className="py-2 bg-gray-800 col-span-2">
      <h1 className="p-6 text-3xl font-semibold text-center text-purple-500"><span className="text-4xl text-purple-400">N</span>themic</h1>
      <div className="flex flex-col">

        <NavLink exact to="/" activeClassName="bg-gray-700" className="flex items-center p-4 px-8 text-xl transition-colors hover:text-purple-400">
          <HomeIcon className="w-6 h-6" />
          <span className="pl-4">Home</span>
        </NavLink>

        <NavLink to="/search" activeClassName="bg-gray-700" className="flex items-center p-4 px-8 text-xl transition-colors hover:text-purple-400">
          <SearchIcon className="w-6 h-6" />
          <span className="pl-4">Search</span>
        </NavLink>

        <NavLink to="/settings" activeClassName="bg-gray-700" className="flex items-center p-4 px-8 text-xl transition-colors hover:text-purple-400">
          <CogIcon className="w-6 h-6" />
          <span className="pl-4">Settings</span>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidenav;
