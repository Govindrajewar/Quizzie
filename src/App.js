import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
