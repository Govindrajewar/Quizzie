import React, { useEffect, useState } from "react";
import eyeIcon from "../../assets/Dashboard/outline-eyes-icon.png";

function DashboardComponent({ userEmail }) {
  const [quizData, setQuizData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalImpressions: 0,
  });

  const currentUserEmail = userEmail;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/quizData/`
        );
        const data = await response.json();

        const userQuizzes = data.filter(
          (quiz) => quiz.createdBy === currentUserEmail
        );

        const totalQuizzes = userQuizzes.length;
        const totalQuestions = userQuizzes.reduce(
          (acc, quiz) => acc + quiz.questions.length,
          0
        );

        const totalImpressions = userQuizzes.reduce((acc, quiz) => {
          return acc + (quiz.impressions || 0);
        }, 0);

        setQuizData(userQuizzes);
        setDashboardStats({
          totalQuizzes,
          totalQuestions,
          totalImpressions,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUserEmail]);

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-data">
        <div className="data data-1">
          <span className="num-of-quiz">{dashboardStats.totalQuizzes}</span>{" "}
          <span className="text">Quiz</span> <br />{" "}
          <span className="text">Created</span>
        </div>
        <div className="data data-2">
          <span className="num-of-quiz">{dashboardStats.totalQuestions}</span>{" "}
          <span className="text">questions</span> <br />{" "}
          <span className="text">Created</span>
        </div>
        <div className="data data-3">
          <span className="num-of-quiz">{dashboardStats.totalImpressions}</span>{" "}
          <span className="text">Total</span> <br />{" "}
          <span className="text">Impressions</span>
        </div>
      </div>

      <h2>Trending Quizzes</h2>
      <div className="quiz-statistics">
        <div className="quizData">
          {quizData.map((quiz) => (
            <div key={quiz._id} className="quiz-data">
              <span className="quiz-title">{quiz.quizName}</span>
              <span className="quiz-impression">
                {quiz.impressions || 0}
                <img src={eyeIcon} alt="eye icon" />
              </span>
              <br />
              <span className="date-created">Created on: {quiz.createdOn}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
