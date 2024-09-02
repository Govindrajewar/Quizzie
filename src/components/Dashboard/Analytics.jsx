import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaShareAlt } from "react-icons/fa";
import "../../style/Dashboard/Analytics.css";

const Analytics = () => {
  const [isDeleteQuiz, setIsDeleteQuiz] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:4000/quizData/");
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Analytics">
      <div className="analytics-header">Quiz Analysis</div>

      <div className="quiz-list-table">
        <div className="header-row">
          <div className="header-cell">S.No</div>
          <div className="header-cell">Quiz Name</div>
          <div className="header-cell">Created on</div>
          <div className="header-cell">Impression</div>
          <div className="header-cell"> </div>
        </div>
        {quizzes.map((quiz, index) => (
          <div
            key={quiz._id}
            className="body-row"
            style={{ backgroundColor: index % 2 === 0 ? "" : "#B3C4FF" }}
          >
            <div className="body-cell">{index + 1}</div>
            <div className="body-cell">{quiz.quizName}</div>
            <div className="body-cell">{quiz.createdOn}</div>
            {/* Placeholder for impressions since it's not provided in the data */}
            <div className="body-cell">{quiz.impressions || "N/A"}</div>
            <div className="body-cell">
              <FaEdit className="icon" id="FaEdit" />
              <FaTrashAlt
                className="icon"
                id="FaTrashAlt"
                onClick={() => setIsDeleteQuiz(true)}
              />
              <FaShareAlt className="icon" id="FaShareAlt" />
              <a href="/" className="link">
                Question Wise Analysis
              </a>
            </div>
          </div>
        ))}
      </div>

      {isDeleteQuiz && (
        <div className="delete-quiz-modal">
          <div className="delete-quiz-modal-content">
            <div className="delete-quiz-modal-body">
              Are you confirm you want to delete ?
            </div>
            <div className="delete-quiz-modal-footer">
              <div
                className="delete-quiz-button"
                onClick={() => alert("Delete")}
              >
                Confirm Delete
              </div>
              <div
                className="Cancel-quiz-button"
                onClick={() => setIsDeleteQuiz(false)}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
