import React, { useState } from "react";
import classNames from "../utils/class-names";
import {secondsToDuration} from '../utils/duration';
import useInterval from "../utils/useInterval";

function PomodoroSettings ({pomodoro, playPause, isTimerRunning, updatePomodoro, stopTime}) {
  let focusDuration = "60:00";
  if (pomodoro.focus != 3600) {
    focusDuration = secondsToDuration(pomodoro.focus);
  }
  let breakDuration = secondsToDuration(pomodoro.break);

  const intervalClickHandler = ({target}) => {
    console.log(target)
    updatePomodoro(target.dataset.testid)
  }

  const stopButtonHandler = () => {
    stopTime();
  }

  return (
    <div className="pomodoro-settings">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {focusDuration}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick = {intervalClickHandler}
              >
                <span className="oi oi-minus"
                /*data-testid="decrease-focus"
                onClick = {intervalClickHandler}*/
                />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick = {intervalClickHandler}
              >
                <span className="oi oi-plus"
                /*data-testid="increase-focus"
                onClick = {intervalClickHandler}*/
                />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {breakDuration}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick = {intervalClickHandler}
                >
                  <span className="oi oi-minus"
                  /*data-testid="decrease-break"
                  onClick = {intervalClickHandler}*/
                  />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  title="Increase Break Time"
                  onClick = {intervalClickHandler}
                >
                  <span className="oi oi-plus"
                  /*data-testid="increase-break"
                  onClick = {intervalClickHandler}*/
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopButtonHandler}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PomodoroSettings;