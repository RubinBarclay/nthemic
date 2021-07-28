import React, { useEffect, useRef, useState } from "react";
import Big from 'big.js';

const ProgressBar = ({ 
  track, 
  playing, 
  progressState,
  setProgressState,
  nextTrack,
  player
}) => {
  const [transition, setTransition] = useState(false);

  let progressSave = useRef('0%');
  let timePassed = useRef(new Big(0));
  let duration = useRef(0);

  useEffect(() => {
    setTransition(true);
    setProgressState(progressSave);

    const interval = setInterval(updateProgress, 500);

    // Stop progress bar on pause
    if (!playing) return clearInterval(interval);

    // Clean up function
    return () => clearInterval(interval);
  }, [playing])

  // Reset everything when changing track
  useEffect(() => {
    progressSave.current = '0%';
    timePassed.current = new Big(0);
    duration.current = track.duration;

    setTransition(false);
    setProgressState('0%');
  }, [track])

  const updateProgress = () => {
    // Check to make sure transition is on, if not, turn on
    !transition && setTransition(true);

    const percentage = timePassed.current.plus(500).div(duration.current);
    const progressStr = percentage.times(100).toString() + '%';

    timePassed.current = timePassed.current.plus(500);
    progressSave.current = progressStr;
    setProgressState(progressStr);
    endOfTrackCheck();
  }

  const selectProgress = (input) => { // input value is between 0-200
    const value = new Big(input);
    const percentage = value.div(2).toFixed(1);

    const newPosition = new Big(duration.current).times(new Big(percentage).div(100));

    progressSave.current = percentage + '%';
    timePassed.current = newPosition;

    setTransition(false);
    setProgressState(percentage + '%');

    // Seek new position in track
    player.seek(newPosition.toNumber())
    endOfTrackCheck();
  }

  const endOfTrackCheck = () => {
    // Run nextTrack when progress bar in full
    // Conditional pause logic is inside nextTrack()
    if (timePassed.current.gte(duration.current)) {
      nextTrack(); 
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 flex bg-gray-700">
      <input 
        type="range"
        id="progressSelector" 
        min="0" 
        max="200" 
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
        onClick={e => selectProgress(e.target.value)} /> 

      <div className="bg-purple-500" style={{
        height: '0.2rem',
        width: progressState,
        transition: transition ? 'all .5s linear' : null,
      }}></div>
    </div>
  )
}

export default ProgressBar;
