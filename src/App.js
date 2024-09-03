import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import QuizInterface from "./components/QuizInterface/QuizInterface.jsx";
import QuestionWiseAnalysis from "./components/Dashboard/QuestionWiseAnalysis.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginSignUp
                setUserEmail={setUserEmail}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard
                  userEmail={userEmail}
                  setIsAuthenticated={setIsAuthenticated}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/quiz/:id" element={<QuizInterface />} />
          <Route path="/quiz-detail/:id" element={<QuestionWiseAnalysis />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
