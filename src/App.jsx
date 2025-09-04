import React from "react";
import DndCardList from "./DndCardList";
import DarkModeToggle from "./DarkModeToggle";
import "./index.css";

function App() {
  return (
    <div className="App">
      <div className="topper">
        <h1>D&D Spells</h1>
        <DarkModeToggle />
      </div>
      <DndCardList />
    </div>
  );
}

export default App;
