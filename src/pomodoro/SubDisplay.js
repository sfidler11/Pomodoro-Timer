import React from "react";
import ProgressBar from "./ProgressBar";
import { secondsToDuration,  minutesToDuration  } from "../utils/duration";

function SubDisplay({
    breakDuration, 
    focusDuration, 
    session, 
    playCounter, 
    }) {


    //this fundction updates the focus and on break title and times in the display
    function displayTimeAndSession({focusDuration, breakDuration}) {
        let sessionLabel = "Focusing";
        let timeStamp = minutesToDuration(focusDuration);
        
        if (session?.label === "On Break") {
          sessionLabel = "On Break";
          timeStamp = minutesToDuration(breakDuration);
        }
        return (
          `${sessionLabel} for ${timeStamp} minutes`
        );
      }
      //when the pause button is pressed, "PAUSED" displays
      function pauseDisplay() {
        if (playCounter % 2 === 0 && !(playCounter===0)) return <h1>PAUSED</h1>;
      }

    //when the play counter is set to 0, the sub display is hidden
    return ( (playCounter > 0) &&
        <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {displayTimeAndSession({breakDuration, focusDuration})}  
              
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(session?.timeRemaining)} remaining
            </p>
            {pauseDisplay()}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <ProgressBar
            session={session} 
            focusDuration={focusDuration} 
            breakDuration={breakDuration}
            />
          </div>
        </div>
      </div>
    );
}

export default SubDisplay;