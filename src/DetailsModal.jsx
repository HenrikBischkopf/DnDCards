// src/DetailsModal.jsx
import React from "react";
import "./DetailsModal.css";

function DetailsModal({ card, endpoint, onClose }) {
  if (!card) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2>{card.name}</h2>

        {endpoint === "/api/spells" && (
          <>
            <p>
              <strong>Level:</strong> {card.level}
            </p>
            <p>
              <strong>Casting Time:</strong> {card.casting_time}
            </p>
            <p>
              <strong>Range:</strong> {card.range}
            </p>
            <p>
              <strong>Duration:</strong> {card.duration}
            </p>
            <p>{card.desc?.join(" ")}</p>
          </>
        )}

        {endpoint === "/api/monsters" && (
          <>
            {card.image && (
              <img
                src={`https://www.dnd5eapi.co${card.image}`}
                alt={card.name}
                style={{
                  maxWidth: "100%",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
            )}
            <p>
              <strong>Size:</strong> {card.size} {card.type}
            </p>
            <p>
              <strong>Alignment:</strong> {card.alignment}
            </p>
            <p>
              <strong>Armor Class:</strong> {card.armor_class?.[0]?.value}
            </p>
            <p>
              <strong>Hit Points:</strong> {card.hit_points}
            </p>
            <p>
              <strong>Challenge Rating:</strong> {card.challenge_rating}
            </p>
          </>
        )}

        {endpoint === "/api/classes" && (
          <>
            <p>
              <strong>Hit Die:</strong> d{card.hit_die}
            </p>
            <p>
              <strong>Proficiencies:</strong>{" "}
              {card.proficiencies?.map((p) => p.name).join(", ")}
            </p>
            <p>
              <strong>Savings Throws:</strong>{" "}
              {card.saving_throws?.map((st) => st.name).join(", ")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailsModal;
