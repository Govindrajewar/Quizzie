import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaShareAlt } from "react-icons/fa";
import "../../style/Dashboard/Analytics.css";

const Analytics = () => {
  const [isDeleteQuiz, setIsDeleteQuiz] = useState(false);

  const quizzes = [
    { id: 1, name: "Quiz 1", date: "04 Sep, 2023", impressions: "667" },
    { id: 2, name: "Quiz 2", date: "04 Sep, 2023", impressions: "667" },
    { id: 3, name: "Quiz 3", date: "09 Sep, 2023", impressions: "789" },
    { id: 4, name: "Quiz 4", date: "09 Sep, 2023", impressions: "789" },
    { id: 5, name: "Quiz 5", date: "13 Sep, 2023", impressions: "2.5K" },
    { id: 6, name: "Quiz 6", date: "13 Sep, 2023", impressions: "2.5K" },
    { id: 7, name: "Quiz 7", date: "17 Sep, 2023", impressions: "1.3K" },
    { id: 8, name: "Quiz 8", date: "17 Sep, 2023", impressions: "1.3K" },
  ];

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
            key={quiz.id}
            className="body-row"
            style={{ backgroundColor: index % 2 === 0 ? "" : "#B3C4FF" }}
          >
            <div className="body-cell">{quiz.id}</div>
            <div className="body-cell">{quiz.name}</div>
            <div className="body-cell">{quiz.date}</div>
            <div className="body-cell">{quiz.impressions}</div>
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
