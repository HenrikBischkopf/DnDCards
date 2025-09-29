import React, { useEffect, useState } from "react";
import DndCard from "./DndCard";
import SearchBar from "./SearchBar";
import DetailsModal from "./DetailsModal";
import FilterBar from "./FilterBar";
import SortBar from "./SortBar";
import CompareModal from "./CompareModal";
import "./DndCardList.css";

function DndCardList({ endpoint }) {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const cardsPerPage = 10;
  const [selectedCard, setSelectedCard] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const toggleCardSelection = (card) => {
    if (selectedCards.some((c) => c.index === card.index)) {
      setSelectedCards(selectedCards.filter((c) => c.index !== card.index));
    } else if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const applySorting = (cards) => {
    let sorted = [...cards];
    switch (sortOption) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "level-asc":
        sorted.sort((a, b) => (a.level || 0) - (b.level || 0));
        break;
      case "level-desc":
        sorted.sort((a, b) => (b.level || 0) - (a.level || 0));
        break;
      case "cr-asc":
        sorted.sort(
          (a, b) => (a.challenge_rating || 0) - (b.challenge_rating || 0)
        );
        break;
      case "cr-desc":
        sorted.sort(
          (a, b) => (b.challenge_rating || 0) - (a.challenge_rating || 0)
        );
        break;
      case "hitdie-asc":
        sorted.sort((a, b) => (a.hit_die || 0) - (b.hit_die || 0));
        break;
      case "hitdie-desc":
        sorted.sort((a, b) => (b.hit_die || 0) - (a.hit_die || 0));
        break;
      default:
        break;
    }
    return sorted;
  };

  const [filters, setFilters] = useState({
    level: "",
    school: "",
    size: "",
    type: "",
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const filteredCards = cards.filter((card) => {
    const matchesQuery = card.name.toLowerCase().includes(query.toLowerCase());

    let matchesFilter = true;
    if (endpoint === "/api/spells") {
      if (filters.level && card.level !== parseInt(filters.level))
        matchesFilter = false;
      if (filters.school && card.school?.name.toLowerCase() !== filters.school)
        matchesFilter = false;
    }
    if (endpoint === "/api/monsters") {
      if (filters.size && card.size?.toLowerCase() !== filters.size)
        matchesFilter = false;
      if (filters.type && card.type?.toLowerCase() !== filters.type)
        matchesFilter = false;
    }

    return matchesQuery && matchesFilter;
  });

  const sortedCards = applySorting(filteredCards);

  const totalPages = Math.ceil(sortedCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = sortedCards.slice(startIndex, endIndex);

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        endpoint={endpoint}
      />
      <SortBar
        sortOption={sortOption}
        setSortOption={setSortOption}
        endpoint={endpoint}
      />
      <div className="card-grid">
        {loading ? (
          <p>Loading...</p>
        ) : currentCards.length === 0 ? (
          <p>No items found.</p>
        ) : (
          currentCards.map((card) => (
            <div
              key={card.index}
              className={
                selectedCards.some((c) => c.index === card.index)
                  ? "selected"
                  : ""
              }
              onClick={() => toggleCardSelection(card)}
              onDoubleClick={() => setSelectedCard(card)} // keep single-card modal on double-click
            >
              <DndCard
                key={card.index}
                card={card}
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
            </div>
          ))
        )}
      </div>
      {selectedCards.length === 2 && (
        <button className="compare-btn" onClick={() => setShowCompare(true)}>
          Compare
        </button>
      )}
      {showCompare && (
        <CompareModal
          cards={selectedCards}
          endpoint={endpoint}
          onClose={() => {
            setShowCompare(false);
            setSelectedCards([]);
          }}
        />
      )}

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

      <DetailsModal
        card={selectedCard}
        endpoint={endpoint}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
}

export default DndCardList;
