import React, { useState, useEffect } from "react";

function DnDCardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://api.open5e.com/spells/?limit=10")
      .then((res) => res.json())
      .then((data) => setCards(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      <h1>DnD Spells</h1>
      <div className="card-container">
        {cards.map((card) => (
          <div key={card.name} className="card">
            <h2>{card.name}</h2>
            <p>Level: {card.level}</p>
            <p>School: {card.school}</p>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DnDCardList;
