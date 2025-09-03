import React, { useEffect, useState } from "react";
import DndCard from "./DndCard";
import "./DndCardList.css";

function DndCardList() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/spells")
      .then((res) => res.json())
      .then(async (data) => {
        //console.log("Spell list:", data.results);

        const details = await Promise.all(
          data.results.slice(0, 50).map(async (spell) => {
            const res = await fetch(`https://www.dnd5eapi.co${spell.url}`);
            return res.json();
          })
        );
        //console.log("Fetched spells:", details.length);
        setCards(details);
      });
  }, []);

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  return (
    <div>
      <div className="card-grid">
        {currentCards.length === 0 ? (
          <p>Loading spells...</p>
        ) : (
          currentCards.map((card) => (
            <DndCard
              key={card.index}
              title={card.name}
              description={card.desc ? card.desc[0] : "No description"}
            />
          ))
        )}
      </div>

      <section className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={page === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </section>
    </div>
  );
}

export default DndCardList;
