import React from 'react';

const Sidenav = () => {
  return (
    <div className="bg-gray-800 col-span-3">
      <h1 className="p-6 text-2xl font-semibold text-center text-purple-500"><span className="text-3xl text-purple-400">N</span>themic</h1>
      <ul className="p-4 list-none">
        {/* Try to use the @apply tailind funnction, to pervent duplicating css classes like with li tags below */}
        <li className="flex items-center p-4 px-8 text-xl text-white hover:text-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="pl-4">Home</span>
        </li>
        <li className="flex items-center p-4 px-8 text-xl text-white hover:text-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg> 
          <span className="pl-4">Search</span>
        </li>
      </ul>
    </div>
  )
}

export default Sidenav;
