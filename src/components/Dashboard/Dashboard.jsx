import { useState, useEffect } from "react";
import "../../style/Dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";
import CreateQuiz from "./CreateQuiz";
import ShareQuizLink from "./ShareQuizLink";
import Analytics from "./Analytics";
import DashboardComponent from "./DashboardComponent";

function Dashboard({ userEmail, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [isDashboard, setIsDashboard] = useState(true);
  const [isAnalytics, setIsAnalytics] = useState(false);
  const [isCreateQuiz, setIsCreateQuiz] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [isQuizTypeQA, setIsQuizTypeQA] = useState(true);
  const [isShareQuizLink, setIsShareQuizLink] = useState(false);

  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("Q&A");
  const [quizId, setQuizId] = useState("");
  const [createdQuizId, setCreatedQuizId] = useState("");

  const handleDashboard = () => {
    setIsDashboard(true);
    setIsAnalytics(false);
    setIsCreateQuiz(false);
    setIsShareQuizLink(false);

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
    setIsShareQuizLink(false);

    // add new class to create quiz & remove active class from other components
    document.getElementById("createQuizId").classList.add("dashboard-active");
    document.getElementById("dashboardId").classList.remove("dashboard-active");
    document.getElementById("analyticsId").classList.remove("dashboard-active");
  };

  const handleLogout = () => {
    alert("Logged out");
    setIsAuthenticated(false);
    navigate("/");
  };

  const addClassToQA = () => {
    setIsQuizTypeQA(true);
    setQuizType("Q&A");
    document.getElementById("QA-Id").classList.add("quizType-select");
    document.getElementById("PT-Id").classList.remove("quizType-select");
  };

  const addClassToPT = () => {
    setIsQuizTypeQA(false);
    setQuizType("Poll Type");
    document.getElementById("PT-Id").classList.add("quizType-select");
    document.getElementById("QA-Id").classList.remove("quizType-select");
  };

  const handleContinue = () => {
    if (quizName.trim() === "") {
      alert("Please enter a quiz name.");
      return;
    }

    if (!isQuizTypeQA && quizType !== "Poll Type") {
      alert("Please select a quiz type.");
      return;
    }

    /*   TODO: NOT APPLICABLE SINCE WE ARE USING MONGODB SERVER
    // Retrieve existing quizzes from local storage
    const existingQuizzes = JSON.parse(localStorage.getItem("quizData")) || [];

    // Check if the quiz name already exists
    const quizExists = existingQuizzes.some(
      (quiz) => quiz.quizName === quizName
    );

    if (quizExists) {
      alert("Quiz name already exists. Please choose a different name.");
      return;
    }

    console.log("Quiz Name:", quizName + " Quiz Type:", quizType);
    */
    setIsContinue(true);
  };

  const handleCancel = () => {
    setIsCreateQuiz(false);
    setQuizName("");
  };

  useEffect(() => {
    const generateQuizId = (length) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const uniqueQuizId = generateQuizId(8);
    setQuizId(uniqueQuizId);
  }, []);

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
        {isDashboard && <DashboardComponent />}

        {isAnalytics && <Analytics />}

        {isCreateQuiz && (
          <div className="createQuiz">
            <div className="create-quiz">
              <input
                type="text"
                name="quizName"
                id="quizName"
                placeholder="Quiz name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />
              <div className="quizType">
                <div className="quiz-type-select">Quiz Type</div>
                <div
                  className="quiz-type quizType-select"
                  id="QA-Id"
                  onClick={addClassToQA}
                >
                  Q & A
                </div>
                <div className="quiz-type" id="PT-Id" onClick={addClassToPT}>
                  Poll Type
                </div>
              </div>

              <div className="buttons">
                <div className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </div>
                <div className="continue-btn" onClick={handleContinue}>
                  Continue
                </div>
              </div>
            </div>
          </div>
        )}

        {isContinue && (
          <CreateQuiz
            isQuizTypeQA={isQuizTypeQA}
            setIsContinue={setIsContinue}
            setIsShareQuizLink={setIsShareQuizLink}
            setIsCreateQuiz={setIsCreateQuiz}
            quizName={quizName}
            quizType={quizType}
            userEmail={userEmail}
            quizId={quizId}
            setCreatedQuizId={setCreatedQuizId}
          />
        )}
        {isShareQuizLink && (
          <ShareQuizLink
            setIsShareQuizLink={setIsShareQuizLink}
            createdQuizId={createdQuizId}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
