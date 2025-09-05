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
          <h1>D&D Reference</h1>
          <DarkModeToggle />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/spells"
            element={<DndCardList endpoint="/api/spells" />}
          />
          <Route
            path="/monsters"
            element={<DndCardList endpoint="/api/monsters" />}
          />
          <Route
            path="/equipment"
            element={<DndCardList endpoint="/api/equipment" />}
          />
          <Route
            path="/classes"
            element={<DndCardList endpoint="/api/classes" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
