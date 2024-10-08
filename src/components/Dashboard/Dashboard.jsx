import { useState, useEffect } from "react";
import "../../style/Dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";
import CreateQuiz from "./CreateQuiz";
import ShareQuizLink from "./ShareQuizLink";
import Analytics from "./Analytics";
import DashboardComponent from "./DashboardComponent";

function Dashboard() {
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
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("email");

    if (!token || !user) {
      navigate("/");
    } else {
      setUserEmail(user);
    }
  }, [navigate]);

  const handleDashboard = () => {
    setIsDashboard(true);
    setIsAnalytics(false);
    setIsCreateQuiz(false);
    setIsShareQuizLink(false);

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

    const uniqueQuizId = generateQuizId(8);
    setQuizId(uniqueQuizId);

    document.getElementById("createQuizId").classList.add("dashboard-active");
    document.getElementById("dashboardId").classList.remove("dashboard-active");
    document.getElementById("analyticsId").classList.remove("dashboard-active");
  };

  const handleLogout = () => {
    alert("Logged out");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
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

    setIsContinue(true);
  };

  const handleCancel = () => {
    setIsCreateQuiz(false);
    setQuizName("");
  };

  // Helper function to generate a unique quiz ID
  const generateQuizId = (length) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
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
        {isDashboard && <DashboardComponent userEmail={userEmail} />}

        {isAnalytics && <Analytics userEmail={userEmail} />}

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
