import React from "react";
function ProgressBar({session, focusDuration, breakDuration}){
  
  //progress is the value that is passed into the progress bar to show that it changes as the time runs on
  let progress = ( 100 - (session.timeRemaining /
      (session.label === "Focusing"
        ? focusDuration * 60
        : breakDuration * 60)) * 100);
    return (
        <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress} 
                style={{ width: `${progress}%` }} 
              />
            </div>
    )
}

export default ProgressBar;