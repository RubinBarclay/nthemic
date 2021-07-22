import React from 'react';
import underConstruction from '../assets/img/under-construction.png';

const Settings = () => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <img src={underConstruction} alt="under construction" className="h-auto w-80 opacity-85 filter invert" />
    <h2 className="m-4 text-5xl">Under Construction</h2>
  </div>
)

export default Settings;
