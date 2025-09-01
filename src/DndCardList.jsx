import React, { useEffect, useState } from "react";
import DndCard from "./DndCard";
import "./DndCardList.css";

function DndCardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/spells")
      .then((res) => res.json())
      .then(async (data) => {
        //console.log("Spell list:", data.results);

        const details = await Promise.all(
          data.results.slice(0, 8).map(async (spell) => {
            const res = await fetch(`https://www.dnd5eapi.co${spell.url}`);
            const detail = await res.json();

            return detail;
          })
        );

        setCards(details);
      });
  }, []);

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <DndCard
          key={card.index}
          title={card.name}
          description={card.desc ? card.desc[0] : "No description"}
        />
      ))}
    </div>
  );
}

export default DndCardList;
