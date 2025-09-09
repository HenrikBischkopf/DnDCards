import React from "react";
import { FavoritesContext } from "./FavoritesContext";
import "./DndCard.css";

function DndCard({ title, description, image, card }) {
  const { favorites, toggleFavorite } = React.useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.index === card.index);
  return (
    <div className="card">
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => toggleFavorite(card)}>
        {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
      </button>
    </div>
  );
}

export default DndCard;
