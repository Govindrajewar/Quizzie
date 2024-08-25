import React, { useState } from "react";
import "../../style/QuizInterface/QuizInterface.css";
import trophy from "../../assets/QuizInterface/trophy.png";

function QuizInterface() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const questions = [
    "Your question text comes here, it's a sample text 1.",
    "Your question text comes here, it's a sample text 2.",
    "Your question text comes here, it's a sample text 3.",
    "Your question text comes here, it's a sample text 4.",
  ];

  const options = [
    ["Option 1", "Option 2", "Option 3", "Option 4"],
    ["Option 5", "Option 6", "Option 7", "Option 8"],
    ["Option 9", "Option 10", "Option 11", "Option 12"],
    ["Option 13", "Option 14", "Option 15", "Option 16"],
  ];

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextClick = () => {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber((prevNumber) => prevNumber + 1);
      setSelectedOption(null); // Reset the selected option for the next question
    } else {
      setIsQuizCompleted(true);
    }
  };

  return (
    <div className="QuizInterface">
      <div className="QuizInterface-content">
        <div className="QuizInterface-header">
          <div className="QuizInterface-quiz-number">
            {String(questionNumber + 1).padStart(2, "0")}/
            {String(questions.length).padStart(2, "0")}
          </div>
          <div className="QuizInterface-quiz-timer">00:10s</div>
        </div>
        <div className="QuizInterface-question">
          {questions[questionNumber]}
        </div>

        <div className="QuizInterface-options">
          {options[questionNumber].map((option, index) => (
            <div
              key={index}
              className={`QuizInterface-option ${
                selectedOption === index ? "selected-option" : ""
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="QuizInterface-next-btn" onClick={handleNextClick}>
          {questionNumber < questions.length - 1 ? "NEXT" : "SUBMIT"}
        </div>
      </div>

      {isQuizCompleted && (
        <div className="QuizInterface-completion-message">
          <div className="QuizInterface-completion-header">
            Congrats Quiz is completed
          </div>
          <img src={trophy} alt="trophy" />
          <div className="QuizInterface-completion-scorecard">
            Your Score is <span className="QuizInterface-scorecard">03/04</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizInterface;
