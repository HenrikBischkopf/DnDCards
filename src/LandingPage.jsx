import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-grid">
      <Link to="/spells" className="tile">
        🪄 Spells
      </Link>
      <Link to="/monsters" className="tile">
        🐲 Monsters
      </Link>
      <Link to="/classes" className="tile">
        🧙 Classes
      </Link>
      <Link to="/equipment" className="tile">
        ⚔️ Equipment
      </Link>
    </div>
  );
}

export default LandingPage;
