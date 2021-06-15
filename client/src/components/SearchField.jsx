import React from 'react';

const SearchField = (props) => {
  return (
    <div className="flex items-end justify-center h-1/4">
      <input 
        type="text" 
        placeholder="Search" 
        onChange={e => props.handler(e.target.value)}
        className="w-1/3 px-2 text-2xl bg-transparent border-b-2 border-purple-500 focus:border-purple-600" />
    </div>
  )
}

export default SearchField;
