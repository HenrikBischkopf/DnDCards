import React, { useState, useEffect } from "react";
import "./SearchBar.css";

function SearchBar({ query, setQuery }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }, [history]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() && !history.includes(value)) {
      setHistory((prev) => [value, ...prev].slice(0, 5));
    }
  };

  const handleSelectHistory = (value) => {
    setQuery(value);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
      {history.length > 0 && (
        <ul className="history-dropdown">
          {history.map((item, index) => (
            <li
              key={index}
              className="history-item"
              onClick={() => handleSelectHistory(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
