import React, { useEffect, useRef, useState } from "react";
import Big from 'big.js';

const ProgressBar = ({ 
  track, 
  trackList,
  playing, 
  setPlaying,
  player
}) => {
  const [progressState, setProgressState] = useState('0%');
  const [transition, setTransition] = useState(true);
  let progressSave = useRef('0%');
  let timePassed = useRef(new Big(0));

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
    setTransition(false);
    setProgressState('0%');
    progressSave.current = '0%';
    timePassed.current = new Big(0);
  }, [track])

  const updateProgress = () => {
    const percentage = timePassed.current.plus(500).div(track?.duration);
    const progressStr = percentage.times(100).toString() + '%';

    timePassed.current = timePassed.current.plus(500);
    progressSave.current = progressStr;
    setProgressState(progressStr);
    endOfTrackCheck();
  }

  const selectProgress = (input) => { // value is between 0-200
    const value = new Big(input);
    const percentage = value.div(2).toFixed(1);

    const newPosition = new Big(track?.duration).times(new Big(percentage).div(100));

    setTransition(false);
    setProgressState(percentage + '%');
    progressSave.current = percentage + '%';
    timePassed.current = newPosition;

    // Seek new position in track
    player.seek(newPosition.toNumber())
    endOfTrackCheck();
  }

  const endOfTrackCheck = () => {
    // Don't stop playing if track is NOT last item in trackList
    if (track.id !== trackList[trackList.length - 1]?.id) return;

    // Stop playing when track ends
    if (timePassed.current.gte(track?.duration)) {
      setPlaying(prevPlaying => !prevPlaying);
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
