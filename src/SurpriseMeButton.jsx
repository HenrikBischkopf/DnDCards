import React, { useState } from "react";
import "./SurpriseMeButton.css";

function SurpriseMeButton() {
  const [randomCard, setRandomCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { name: "Spells", endpoint: "/api/spells" },
    { name: "Monsters", endpoint: "/api/monsters" },
  ];

  async function fetchRandom() {
    setLoading(true);
    setRandomCard(null);

    try {
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      const res = await fetch(`https://www.dnd5eapi.co${category.endpoint}`);
      const data = await res.json();
      const results = data.results;

      const randomItem = results[Math.floor(Math.random() * results.length)];

      const detailRes = await fetch(`https://www.dnd5eapi.co${randomItem.url}`);
      const detail = await detailRes.json();

      setRandomCard({
        title: detail.name,
        description:
          category.name === "Spells"
            ? detail.desc?.[0] || "No description"
            : category.name === "Monsters"
            ? `${detail.size} ${detail.type}`
            : "No description available",
        image:
          category.name === "Monsters" && detail.image
            ? `https://www.dnd5eapi.co${detail.image}`
            : null,
      });
    } catch (err) {
      console.error("Error fetching random card:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="surprise-me">
      <button onClick={fetchRandom} disabled={loading}>
        {loading ? "Rolling the dice..." : "🎲 Surprise Me!"}
      </button>

      {randomCard && (
        <div className="surprise-card">
          {randomCard.image && (
            <img src={randomCard.image} alt={randomCard.title} />
          )}
          <h3>{randomCard.title}</h3>
          <p>{randomCard.description}</p>
        </div>
      )}
    </div>
  );
}

export default SurpriseMeButton;
