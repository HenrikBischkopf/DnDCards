import React from "react";
import "./DndCard.css";

function DndCard({ title, description }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default DndCard;
