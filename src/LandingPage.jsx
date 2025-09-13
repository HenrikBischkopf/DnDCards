import React from "react";
import { Link } from "react-router-dom";
import SurpriseMeButton from "./SurpriseMeButton";
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
      <Link to="/favorites" className="tile">
        ⭐ Favorites
      </Link>
      <SurpriseMeButton />
    </div>
  );
}

export default LandingPage;
