import React, { useEffect, useRef, useState } from "react";

const ProgressBar = ({ playing, duration }) => {
  const [progressState, setProgressState] = useState('0%');
  let progressSave = useRef('0%');
  let timePassed = useRef(0);

  // useEffect(() => {
  //   setProgressState(progress)
  // }, [progress])

  useEffect(() => {
    setProgressState(progressSave);
    const interval = setInterval(updateProgress, 500);

    // Stop progress bar on pause
    if (!playing) return clearInterval(interval);

    // Clean up function
    return () => clearInterval(interval);
  }, [playing])

  const updateProgress = () => {
    const percentage = (timePassed.current + 500) / duration;
    const strPercent = percentage.toString();
    const progressStr = `${strPercent.slice(2, 4)}.${strPercent.slice(4, 6)}%`; 

    timePassed.current = timePassed.current + 500;
    progressSave.current = progressStr;
    setProgressState(progressStr);
  }

  return (
    <div className="absolute top-0 left-0 right-0 flex bg-gray-700">
      <div className="bg-purple-500 transition-all duration-500 ease-linear" style={{
        height: '0.2rem',
        width: progressState
      }}></div>
    </div>
  )
}

export default ProgressBar;
