import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../style/Dashboard/QuestionWiseAnalysis.css";
import { BACKEND_URL } from "../../Links.js";

const QuestionWiseAnalysis = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/quiz/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz details");
        }
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>No quiz found</div>;
  }

  const impressions = quiz.impressions || 0;

  return (
    <div className="QuizDetail">
      <div className="QuizDetail-header">
        <div className="h2">{quiz.quizName} Question Analysis</div>
        <div className="Quiz-Details">
          <p>Created On: {quiz.createdOn}</p>
          <p>Impressions: {impressions}</p>
        </div>
      </div>

      <div className="questions-section">
        {quiz.questions.map((question, index) => {
          const attempted = impressions;
          const correct = question.answeredCorrectly || 0;
          const incorrect = attempted - correct;

          return (
            <div key={question._id} className="question-block">
              <h4>
                Question {index + 1}: {question.question}
              </h4>

              {quiz.quizType === "Poll Type" ? (
                <div className="answer-options">
                  {question.answerOptions.map((option, optionIndex) => (
                    <p key={optionIndex} className="option poll-option-div">
                      <span className="poll-count">
                        {question.answerOptionCount[optionIndex] || 0}
                      </span>{" "}
                      <span className="poll-option">{option}</span>{" "}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="answer-options">
                  <p className="option">
                    <span className="total-numbers">{attempted}</span> <br />{" "}
                    people Attempted the question
                  </p>
                  <p className="option">
                    <span className="total-numbers">{correct}</span> <br />{" "}
                    people Answered Correctly
                  </p>
                  <p className="option">
                    <span className="total-numbers">{incorrect}</span> <br />{" "}
                    people Answered Incorrectly
                  </p>
                </div>
              )}

              <hr style={{ marginTop: "50px" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionWiseAnalysis;
