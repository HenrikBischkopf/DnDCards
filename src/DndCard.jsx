import React from "react";
import "./DndCard.css";

function DnDCard({ title, description }) {
  return (
    <div className="dnd-card">
      <h2 className="card-title">{title}</h2>
      <p className="card-desc">{description}</p>
    </div>
  );
}

export default DnDCard;
