 import React from "react";
 import classNames from "../utils/class-names";

 function PlayPause({    
    isTimerRunning,
    setIsTimerRunning,
    focusDuration,
    setFocusDuration,
    breakDuration,
    setBreakDuration,
    setSession,
    playCounter,
    setPlayCounter,
    session
    })  
    {
    


    function playAndPause() {
    setPlayCounter(playCounter + 1);
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
}
  function stop() {
      
      setFocusDuration(() => 25)
      setBreakDuration(() => 5);
      setIsTimerRunning(() => false); 
      setPlayCounter(() => 0); 
      setSession(() => null);
          

  }


    return (
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
          onClick={playAndPause}
        >
          <span
            className={classNames({
              oi: true,
              "oi-media-play": !isTimerRunning,
              "oi-media-pause": isTimerRunning,
            })}
          />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="stop"
          title="Stop the session"
          disabled={playCounter===0}
          onClick={stop}
        >
          <span className="oi oi-media-stop" />
        </button>
      </div>
    )
}
  

  export default PlayPause;