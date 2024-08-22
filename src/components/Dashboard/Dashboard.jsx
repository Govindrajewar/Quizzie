import { useState } from "react";
import "../../style/Dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [isDashboard, setIsDashboard] = useState(false);
  const [isAnalytics, setIsAnalytics] = useState(false);
  const [isCreateQuiz, setIsCreateQuiz] = useState(false);

  const handleDashboard = () => {
    setIsDashboard(true);
    setIsAnalytics(false);
    setIsCreateQuiz(false);

    // add new class to create quiz & remove active class from other components
    document.getElementById("dashboardId").classList.add("dashboard-active");
    document.getElementById("analyticsId").classList.remove("dashboard-active");
    document
      .getElementById("createQuizId")
      .classList.remove("dashboard-active");
  };

  const handleAnalytics = () => {
    setIsDashboard(false);
    setIsAnalytics(true);
    setIsCreateQuiz(false);

    // add new class to create quiz & remove active class from other components
    document.getElementById("analyticsId").classList.add("dashboard-active");
    document.getElementById("dashboardId").classList.remove("dashboard-active");
    document
      .getElementById("createQuizId")
      .classList.remove("dashboard-active");
  };

  const handleCreateQuiz = () => {
    setIsDashboard(false);
    setIsAnalytics(false);
    setIsCreateQuiz(true);

    // add new class to create quiz & remove active class from other components
    document.getElementById("createQuizId").classList.add("dashboard-active");
    document.getElementById("dashboardId").classList.remove("dashboard-active");
    document.getElementById("analyticsId").classList.remove("dashboard-active");
  };

  const handleLogout = () => {
    alert("Logged out");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-navbar">
        <h1>QUIZZIE</h1>
        <ul>
          <li onClick={handleDashboard} id="dashboardId">
            Dashboard
          </li>
          <li onClick={handleAnalytics} id="analyticsId">
            Analytics
          </li>
          <li onClick={handleCreateQuiz} id="createQuizId">
            Create Quiz
          </li>
        </ul>
        <div>
          <hr />
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>

      <div className="dashboard-content">
        {isDashboard && (
          <div>
            <h2>Dashboard!</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              scelerisque, mi vitae tristique fermentum, justo risus blandit
              ipsum, non consectetur purus dolor nec metus. Donec auctor
              tristique neque, sed fermentum purus.
            </p>
          </div>
        )}

        {isAnalytics && (
          <div>
            <h2>Analyst!</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              scelerisque, mi vitae tristique fermentum, justo risus blandit
              ipsum, non consectetur purus dolor nec metus. Donec auctor
              tristique neque, sed fermentum purus.
            </p>
          </div>
        )}

        {isCreateQuiz && (
          <div>
            <h2>Create Quiz</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              scelerisque, mi vitae tristique fermentum, justo risus blandit
              ipsum, non consectetur purus dolor nec metus. Donec auctor
              tristique neque, sed fermentum purus.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
