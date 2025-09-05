import React from "react";
import "./DndCard.css";

function DndCard({ title, description, image }) {
  return (
    <div className="card">
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default DndCard;
