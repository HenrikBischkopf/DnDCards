import React, { useEffect, useState } from "react";
import "./DarkModeToggle.css";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="toggle-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className="slider"></span>
      </label>
      <span>{darkMode ? "🌙 Dark" : "☀️ Light"}</span>
    </div>
  );
}

export default DarkModeToggle;
