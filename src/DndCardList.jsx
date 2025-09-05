import React, { useEffect, useState } from "react";
import DndCard from "./DndCard";
import "./DndCardList.css";

function DndCardList({ endpoint }) {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`https://www.dnd5eapi.co${endpoint}`);
        const data = await res.json();

        const results = data.results || [];

        const details = await Promise.all(
          results.slice(0, 50).map(async (item) => {
            const res = await fetch(`https://www.dnd5eapi.co${item.url}`);
            return res.json();
          })
        );

        setCards(details);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  return (
    <div>
      <div className="card-grid">
        {loading ? (
          <p>Loading...</p>
        ) : currentCards.length === 0 ? (
          <p>No items found.</p>
        ) : (
          currentCards.map((card) => (
            <DndCard
              key={card.index}
              title={card.name}
              description={
                endpoint === "/api/spells"
                  ? card.desc?.[0] || "No description"
                  : endpoint === "/api/classes"
                  ? `Hit Die: d${card.hit_die}`
                  : endpoint === "/api/monsters"
                  ? card.size && card.type
                    ? `${card.size} ${card.type}`
                    : "Monster"
                  : "No description available"
              }
              image={
                endpoint === "/api/monsters" && card.image
                  ? `https://www.dnd5eapi.co${card.image}`
                  : null
              }
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
