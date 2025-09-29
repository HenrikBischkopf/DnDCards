import React, { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";
import "./DndCard.css";

function DndCard({ card, title, description, image }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext || {});
  const item = card || { index: title, name: title };
  const isFavorite = favorites?.some((fav) => fav.index === item.index);

  return (
    <div className="card">
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}

      <h3 className="card-title">{title || item.name}</h3>
      <p className="description">{description}</p>

      <div style={{ marginTop: "auto" }}>
        <button className="fav-btn" onClick={() => toggleFavorite(item)}>
          {isFavorite ? "★ Remove" : "☆ Add"}
        </button>
      </div>
    </div>
  );
}

export default DndCard;
