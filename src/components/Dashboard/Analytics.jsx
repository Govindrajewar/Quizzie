import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaShareAlt } from "react-icons/fa";
import "../../style/Dashboard/Analytics.css";
import done from "../../assets/CreateQuiz/done.png";
import { BACKEND_URL } from "../../Links.js";

const Analytics = ({ userEmail }) => {
  const [isDeleteQuiz, setIsDeleteQuiz] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [isCopyLink, setIsCopyLink] = useState(false);
  const currentUserEmail = userEmail;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/quizData`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        const data = await response.json();

        const userQuizzes = data.filter(
          (quiz) => quiz.createdBy === currentUserEmail
        );

        setQuizzes(userQuizzes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [currentUserEmail]);

  const handleDeleteQuiz = async () => {
    if (!quizToDelete) return;

    try {
      const response = await fetch(`${BACKEND_URL}/quiz/${quizToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete quiz");
      }

      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizToDelete));
      setIsDeleteQuiz(false);
      setQuizToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopyQuizLink = (quizId) => {
    const quizUrl = `${window.location.origin}/quiz/${quizId}`;
    navigator.clipboard
      .writeText(quizUrl)
      .then(() => {
        setIsCopyLink(true);
        setTimeout(() => {
          setIsCopyLink(false);
        }, 3000);
      })
      .catch((err) => {
        alert("Failed to copy quiz URL");
      });
  };

  const handleCloseLink = () => {
    setIsCopyLink(false);
  };

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
            <div className="body-cell">{quiz.impressions || 0}</div>
            <div className="body-cell">
              <FaEdit className="icon" id="FaEdit" />
              <FaTrashAlt
                className="icon"
                id="FaTrashAlt"
                onClick={() => {
                  setQuizToDelete(quiz._id);
                  setIsDeleteQuiz(true);
                }}
              />
              <FaShareAlt
                className="icon"
                id="FaShareAlt"
                onClick={() => handleCopyQuizLink(quiz._id)}
              />
              <a href={`/quiz-detail/${quiz._id}`} className="link">
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
              <div className="delete-quiz-button" onClick={handleDeleteQuiz}>
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

      {isCopyLink && (
        <div className="share-link-copy">
          <img src={done} alt="done" />
          <div>Link copied to clipboard</div>
          <div className="close-message" onClick={handleCloseLink}>
            ×
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
