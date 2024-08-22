import { useState } from "react";
import "../../style/Dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../../assets/Dashboard/outline-eyes-icon.png";

function Dashboard() {
  const navigate = useNavigate();
  const [isDashboard, setIsDashboard] = useState(false);
  const [isAnalytics, setIsAnalytics] = useState(false);
  const [isCreateQuiz, setIsCreateQuiz] = useState(true);

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

  const addClassToQA = () => {
    document.getElementById("QA-Id").classList.add("quizType-select");
    document.getElementById("PT-Id").classList.remove("quizType-select");
  };

  const addClassToPT = () => {
    document.getElementById("PT-Id").classList.add("quizType-select");
    document.getElementById("QA-Id").classList.remove("quizType-select");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-navbar">
        <h1>QUIZZIE</h1>
        <ul>
          <li
            onClick={handleDashboard}
            id="dashboardId"
            className="dashboard-active"
          >
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
          <div className="dashboard-header">
            <div className="dashboard-header-data">
              <div className="data data-1">
                <span className="num-of-quiz">12</span>{" "}
                <span className="text">Quiz</span> <br />{" "}
                <span className="text">Created</span>
              </div>
              <div className="data data-2">
                <span className="num-of-quiz">110</span>{" "}
                <span className="text">questions</span> <br />{" "}
                <span className="text">Created</span>
              </div>
              <div className="data data-3">
                <span className="num-of-quiz">1.4k</span>{" "}
                <span className="text">Total</span> <br />{" "}
                <span className="text">Impressions</span>
              </div>
            </div>

            <h2>Trending Quiz's</h2>
            <div className="quiz-statistics">
              <div className="quizData">
                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>
                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>
                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>
                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>
                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>

                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>

                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>

                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>

                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>
                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>
                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>
                <div className="quiz-data">
                  <span className="quiz-title">Quiz 1</span>
                  <span className="quiz-impression">
                    667
                    <img src={eyeIcon} alt="eye icon" />
                  </span>
                  <br />
                  <span className="date-created">
                    Created on : 04 Sep, 2023
                  </span>
                </div>
              </div>
            </div>
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
          <div className="createQuiz">
            <div className="create-quiz">
              <input
                type="text"
                name="quizName"
                id="quizName"
                placeholder="Quiz name"
              />
              <div className="quizType">
                <div className="quiz-type-select">Quiz Type</div>
                <div className="quiz-type" id="QA-Id" onClick={addClassToQA}>
                  Q & A
                </div>
                <div className="quiz-type" id="PT-Id" onClick={addClassToPT}>
                  Poll Type
                </div>
              </div>

              <div className="buttons">
                <div className="cancel-btn">Cancel</div>
                <div className="continue-btn">Continue</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
