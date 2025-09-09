import React, { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";
import DndCard from "./DndCard";

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return <p>No favorites yet. Add some spells, monsters, or classes!</p>;
  }

  return (
    <div className="card-grid">
      {favorites.map((card) => (
        <DndCard
          key={card.index}
          title={card.name}
          description={card.desc?.[0] || card.type || "No description"}
          image={card.image ? `https://www.dnd5eapi.co${card.image}` : null}
          card={card}
        />
      ))}
    </div>
  );
}

export default FavoritesPage;
