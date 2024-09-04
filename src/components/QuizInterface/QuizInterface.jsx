import React, { useState, useEffect } from "react";
import "../../style/QuizInterface/QuizInterface.css";
import trophy from "../../assets/QuizInterface/trophy.png";
import axios from "axios";
import BACKEND_ORIGIN_URL from "../../links"

function QuizInterface() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [score, setScore] = useState(0);
  // eslint-disable-next-line
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}s`;
  };

  useEffect(() => {
    const quizUrl = window.location.href;

    const fetchQuizId = (quizUrl) => {
      const segments = quizUrl.split("/");
      return segments[segments.length - 1];
    };

    setQuizId(fetchQuizId(quizUrl));

    if (quizId) {
      axios
        .get(`${BACKEND_ORIGIN_URL}/quiz/${quizId}`)
        .then((response) => {
          setQuizData(response.data);
          const answers = response.data.questions.map(
            (question) => question.correctAnswer - 1
          );
          setCorrectAnswers(answers);
        })
        .catch((error) => {
          console.error("There was an error fetching the quiz data!", error);
        });
    }
  }, [quizId]);

  useEffect(() => {
    if (quizData) {
      const currentQuestion = quizData.questions[questionNumber];
      const initialTime =
        currentQuestion.timer === "OFF"
          ? null
          : parseInt(currentQuestion.timer, 10);

      if (initialTime) {
        setTimer(initialTime);

        const interval = setInterval(() => {
          setTimer((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(interval);
              handleNextClick();
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);

        return () => clearInterval(interval);
      } else {
        setTimer(null);
      }
    }
    // eslint-disable-next-line
  }, [quizData, questionNumber]);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextClick = () => {
    if (selectedOption !== null) {
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[questionNumber] = selectedOption;
        return updatedAnswers;
      });
    }

    if (quizData) {
      if (selectedOption === correctAnswers[questionNumber]) {
        updateAnsweredCorrectlyCount(quizId, questionNumber); 
        setScore((prevScore) => prevScore + 1);
      }

      if (questionNumber < quizData.questions.length - 1) {
        setQuestionNumber((prevNumber) => prevNumber + 1);
        setSelectedOption(null);
      } else {
        setUserAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[questionNumber] = selectedOption;
          updateImpressions(quizId);
          return updatedAnswers;
        });
        setIsQuizCompleted(true);
      }
    }
  };

  const updateImpressions = async (quizId) => {
    try {
      await axios.put(`${BACKEND_ORIGIN_URL}/quiz/${quizId}/impressions`);
    } catch (error) {
      console.error("Error updating impressions:", error);
    }
  };

  const updateAnsweredCorrectlyCount = async (quizId, questionIndex) => {
    try {
      await axios.put(
        `${BACKEND_ORIGIN_URL}/quiz/${quizId}/question/${questionIndex}/correct`
      );
    } catch (error) {
      console.error("Error updating answeredCorrectly count:", error);
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
          {timer !== null && timer > 0 && (
            <div className="QuizInterface-quiz-timer">{formatTime(timer)}</div>
          )}
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
            Your Score is{" "}
            <span className="QuizInterface-scorecard">
              {score}/{quizData.questions.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizInterface;
