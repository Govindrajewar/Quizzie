import React from "react";
import "../../style/Dashboard/CreateQuiz.css";

function ClockTimer({ selectedLi, handleClick }) {
  return (
    <div className="clock-timer">
      <ul>
        <li className="timer-header">Timer</li>
        <li
          className={selectedLi === 1 ? "selected" : ""}
          onClick={() => handleClick(1)}
        >
          OFF
        </li>
        <li
          className={selectedLi === 2 ? "selected" : ""}
          onClick={() => handleClick(2)}
        >
          5 sec
        </li>
        <li
          className={selectedLi === 3 ? "selected" : ""}
          onClick={() => handleClick(3)}
        >
          10 sec
        </li>
      </ul>
    </div>
  );
}

export default ClockTimer;
