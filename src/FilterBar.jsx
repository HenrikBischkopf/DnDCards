import React from "react";
import "./FilterBar.css";

function FilterBar({ filters, setFilters, endpoint }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      level: "",
      school: "",
      size: "",
      type: "",
    });
  };

  return (
    <div className="filter-bar">
      {endpoint === "/api/spells" && (
        <>
          <select name="level" value={filters.level} onChange={handleChange}>
            <option value="">All Levels</option>
            {[...Array(10).keys()].map((lvl) => (
              <option key={lvl} value={lvl}>
                Level {lvl}
              </option>
            ))}
          </select>

          <select name="school" value={filters.school} onChange={handleChange}>
            <option value="">All Schools</option>
            <option value="abjuration">Abjuration</option>
            <option value="conjuration">Conjuration</option>
            <option value="divination">Divination</option>
            <option value="enchantment">Enchantment</option>
            <option value="evocation">Evocation</option>
            <option value="illusion">Illusion</option>
            <option value="necromancy">Necromancy</option>
            <option value="transmutation">Transmutation</option>
          </select>
        </>
      )}

      {endpoint === "/api/monsters" && (
        <>
          <select name="size" value={filters.size} onChange={handleChange}>
            <option value="">All Sizes</option>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
            <option value="gargantuan">Gargantuan</option>
          </select>

          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">All Types</option>
            <option value="aberration">Aberration</option>
            <option value="beast">Beast</option>
            <option value="celestial">Celestial</option>
            <option value="construct">Construct</option>
            <option value="dragon">Dragon</option>
            <option value="elemental">Elemental</option>
            <option value="fiend">Fiend</option>
            <option value="giant">Giant</option>
            <option value="humanoid">Humanoid</option>
            <option value="monstrosity">Monstrosity</option>
            <option value="ooze">Ooze</option>
            <option value="plant">Plant</option>
            <option value="undead">Undead</option>
          </select>
        </>
      )}
      <button className="clear-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
}

export default FilterBar;
