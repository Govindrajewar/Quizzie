import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import QuizInterface from "./components/QuizInterface/QuizInterface.jsx";
import QuestionWiseAnalysis from "./components/Dashboard/QuestionWiseAnalysis.jsx";

function App() {
  const [userEmail, setUserEmail] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginSignUp setUserEmail={setUserEmail} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard userEmail={userEmail} />}
          />
          <Route path="/quiz/:id" element={<QuizInterface />} />
          <Route path="/quiz-detail/:id" element={<QuestionWiseAnalysis />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
