import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DndCardList from "./DndCardList";
import DarkModeToggle from "./DarkModeToggle";
import LandingPage from "./LandingPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="topper">
          <h1>D&D Spells</h1>
          <DarkModeToggle />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/spells"
            element={<DndCardList endpoint="/api/spells" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
