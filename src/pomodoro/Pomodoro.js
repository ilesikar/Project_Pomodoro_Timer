import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import PomodoroTimer from "./PomodoroTimer.js"
import PomodoroSettings from "./PomodoroSettings"

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [pomodoro, setPomodoro] = useState({focus: 1500, break: 300, time: 1500});
  const [onFocus, setOnFocus] = useState(true);
  
  const stopTime = () => {
    setIsTimerRunning(false);
    setIsTimer(false);
    setOnFocus(true);
    setPomodoro({...pomodoro, time: pomodoro.focus});
  }

  const updatePomodoro = (type) => {
    setOnFocus(true);
    if (!isTimerRunning) {
      if (type === "decrease-focus") {
        const newTime = Math.max(pomodoro.focus - 300, 300);
        setPomodoro({...pomodoro, focus: newTime, time: newTime})
      }
      if (type === "increase-focus") {
        const newTime = Math.min(pomodoro.focus + 300, 3600);
        setPomodoro({...pomodoro, focus: newTime, time: newTime})
      }
      if (type === "decrease-break") {
        const newTime = Math.max(pomodoro.break - 60, 60);
        setPomodoro({...pomodoro, break: newTime})
      }
      if (type === "increase-break") {
        const newTime = Math.min(pomodoro.break + 60, 900);
        setPomodoro({...pomodoro, break: newTime})
      }
    }
  }

  useInterval(
    () => {
      const nextSecond = pomodoro.time - 1;
      if (nextSecond === 0) {
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        if (onFocus) {
          setPomodoro({...pomodoro, time: pomodoro.break});
        } else {
          setPomodoro({...pomodoro, time: pomodoro.focus});
        }
        setOnFocus(!onFocus);
      } else {
        setPomodoro({...pomodoro, time: nextSecond});
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if (!isTimer) setIsTimer(true);
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <PomodoroSettings
        pomodoro={pomodoro} playPause={playPause}
        isTimerRunning={isTimerRunning} updatePomodoro={updatePomodoro}
        stopTime={stopTime}
      />
      <PomodoroTimer
      pomodoro={pomodoro} isTimerRunning={isTimerRunning}
      isTimer={isTimer} onFocus={onFocus}
      />
    </div>
  );
}

export default Pomodoro;
