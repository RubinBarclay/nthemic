import React from 'react';
import { NavLink } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="py-2 bg-gray-800 col-span-3">
      <h1 className="p-6 text-3xl font-semibold text-center text-purple-500"><span className="text-4xl text-purple-400">N</span>themic</h1>
      <div className="flex flex-col">

        <NavLink exact to="/" activeClassName="bg-gray-700" className="flex items-center p-4 px-8 text-xl hover:text-purple-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="pl-4">Home</span>
        </NavLink>

        <NavLink to="/search" activeClassName="bg-gray-700" className="flex items-center p-4 px-8 text-xl hover:text-purple-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <span className="pl-4">Search</span>
        </NavLink>

        <NavLink to="/settings" activeClassName="bg-gray-700" className="flex items-center p-4 px-8 text-xl hover:text-purple-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="pl-4">Settings</span>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidenav;
