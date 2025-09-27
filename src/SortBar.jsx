import React from "react";
import "./SortBar.css";

function SortBar({ sortOption, setSortOption, endpoint }) {
  const handleChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="sort-bar">
      <label>Sort by:</label>
      <select value={sortOption} onChange={handleChange}>
        <option value="">Default</option>

        {/* Spells */}
        {endpoint === "/api/spells" && (
          <>
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="level-asc">Level (Low → High)</option>
            <option value="level-desc">Level (High → Low)</option>
          </>
        )}

        {/* Monsters */}
        {endpoint === "/api/monsters" && (
          <>
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="cr-asc">Challenge (Low → High)</option>
            <option value="cr-desc">Challenge (High → Low)</option>
          </>
        )}

        {/* Classes */}
        {endpoint === "/api/classes" && (
          <>
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="hitdie-asc">Hit Die (Low → High)</option>
            <option value="hitdie-desc">Hit Die (High → Low)</option>
          </>
        )}
      </select>
    </div>
  );
}

export default SortBar;
