import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import {minutesToDuration}  from "../utils/duration";
import PlayPause from "./PlayPause";
import SubDisplay from "./SubDisplay";


// These functions are defined outside of the component to ensure they do not have access to state
// and are, therefore, more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = (Math.max(0, prevState.timeRemaining - 1));
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher-order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
    
  };

}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  //playCounter manages the state of the Play/Pause button
  const [playCounter, setPlayCounter] = useState(0);
  //setting the initial values of the Focus and Break times to 25 and 5 respectively
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  //progress will help manage the progression bar

  //this increases the focus time by 5 minutes per click and has a max of 60
  const useIncreaseFocus = (event) => {

    setFocusDuration(Math.min(60, focusDuration + 5));
  }
//this will decrease the focus time by 5 minutes per click and has a min of 5
  const useDecreaseFocus = (event) => {

    setFocusDuration(Math.max(5, focusDuration - 5));
  }

  //this will decrease the break time by 1 minute per click and has a min of 1
    const useDecreaseBreak = (event) => {

      setBreakDuration(Math.max(1, breakDuration - 1));
    }

    //this will increase the break time by 1 minute per click and has a max of 15
    const useIncreaseBreak = (event) => {

      setBreakDuration(Math.min(15, breakDuration + 1));

  }

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You won't need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              <button
                onClick={useDecreaseFocus}
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                disabled={playCounter>0}
              >
                <span className="oi oi-minus" />
              </button>
              <button
                onClick={useIncreaseFocus}
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                disabled={playCounter>0}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                <button
                  onClick={useDecreaseBreak}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  disabled={playCounter>0}
                >
                  <span className="oi oi-minus" />
                </button>
                <button
                  onClick={useIncreaseBreak}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  disabled={playCounter>0}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <PlayPause 
              isTimerRunning={isTimerRunning}
              setIsTimerRunning={setIsTimerRunning}
              focusDuration={focusDuration}
              setSession={setSession}
              session={session}
              setFocusDuration={setFocusDuration}
              breakDuration={breakDuration}
              setBreakDuration={setBreakDuration}
              setPlayCounter={setPlayCounter}
              playCounter={playCounter}
          />

        </div>
      </div>
      <SubDisplay 
        focusDuration={focusDuration}
        setSession={setSession}
        session={session}
        setFocusDuration={setFocusDuration}
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration}
        setPlayCounter={setPlayCounter}
        playCounter={playCounter}
        />
    </div>
  );
}

export default Pomodoro;
