import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
