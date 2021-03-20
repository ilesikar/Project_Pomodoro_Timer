import React, { useState }from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Pomodoro from "./Pomodoro";
import {secondsToDuration} from '../utils/duration';

function PomodomoTimer ({pomodoro, isTimerRunning, onFocus, isTimer}) {
  //get minutes and seconds for each value (seconds not really necessary, but were useful for testing)
  let timeDuration = secondsToDuration(pomodoro.time);
  let focusDuration = secondsToDuration(pomodoro.focus);
  let breakDuration = secondsToDuration(pomodoro.break);

  let focusBreakMessage = "Focusing";
  let focusBreakTime = "25:00";
  let percentageTime = 0;

  let pausedMessage = "";

  if (isTimer && !isTimerRunning) {
    pausedMessage = "PAUSED";
  }

  if (onFocus) {
    focusBreakMessage = "Focusing";
    focusBreakTime = focusDuration;
    percentageTime = Math.round((1 - pomodoro.time / pomodoro.focus) * 100);
  } else {
    focusBreakMessage = "On Break"
    focusBreakTime = breakDuration;
    percentageTime = Math.round((1 - pomodoro.time / pomodoro.break) * 100);
  }

  let percentageTimeWidth = percentageTime + "%";

  if (isTimer) {
    return (
      <div>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">{focusBreakMessage} for {focusBreakTime} minutes</h2>
            <p className="lead" data-testid="session-sub-title">
              {timeDuration} remaining
            </p>
          </div>
        </div>
        <span>{pausedMessage}</span>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={percentageTime}
                style={{ width: percentageTimeWidth }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default PomodomoTimer;