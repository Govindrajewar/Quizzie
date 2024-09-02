import React, { useState, useEffect } from "react";
import "../../style/QuizInterface/QuizInterface.css";
import trophy from "../../assets/QuizInterface/trophy.png";
import axios from "axios";

function QuizInterface() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizId, setQuizId] = useState(null);

  useEffect(() => {
    const quizUrl = window.location.href;

    const fetchQuizId = (quizUrl) => {
      const segments = quizUrl.split("/");
      return segments[segments.length - 1];
    };

    setQuizId(fetchQuizId(quizUrl));

    if (quizId) {
      axios
        .get(`http://localhost:4000/quiz/${quizId}`)
        .then((response) => {
          setQuizData(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the quiz data!", error);
        });
    }
  }, [quizId]);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextClick = () => {
    if (quizData && questionNumber < quizData.questions.length - 1) {
      setQuestionNumber((prevNumber) => prevNumber + 1);
      setSelectedOption(null); // Reset the selected option for the next question
    } else {
      setIsQuizCompleted(true);
    }
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="QuizInterface">
      <div className="QuizInterface-content">
        <div className="QuizInterface-header">
          <div className="QuizInterface-quiz-number">
            {String(questionNumber + 1).padStart(2, "0")}/
            {String(quizData.questions.length).padStart(2, "0")}
          </div>
          <div className="QuizInterface-quiz-timer">
            {quizData.questions[questionNumber].timer}
          </div>
        </div>
        <div className="QuizInterface-question">
          {quizData.questions[questionNumber].question}
        </div>

        <div className="QuizInterface-options">
          {quizData.questions[questionNumber].answerOptions.map(
            (option, index) => (
              <div
                key={index}
                className={`QuizInterface-option ${
                  selectedOption === index ? "selected-option" : ""
                }`}
                onClick={() => handleOptionClick(index)}
              >
                {option}
              </div>
            )
          )}
        </div>

        <div className="QuizInterface-next-btn" onClick={handleNextClick}>
          {questionNumber < quizData.questions.length - 1 ? "NEXT" : "SUBMIT"}
        </div>
      </div>

      {isQuizCompleted && (
        <div className="QuizInterface-completion-message">
          <div className="QuizInterface-completion-header">
            Congrats, the quiz is completed
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
