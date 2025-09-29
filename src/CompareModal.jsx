import React from "react";
import "./CompareModal.css";

function CompareModal({ cards, endpoint, onClose }) {
  if (!cards || cards.length < 2) return null;

  const [cardA, cardB] = cards;

  return (
    <div className="modal-overlay">
      <div className="modal-content compare-modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Compare</h2>
        <div className="compare-grid">
          <div className="compare-card">
            <h3>{cardA.name}</h3>
            {endpoint === "/api/spells" && (
              <>
                <p>
                  <strong>Level:</strong> {cardA.level}
                </p>
                <p>
                  <strong>School:</strong> {cardA.school?.name}
                </p>
                <p>{cardA.desc?.[0]}</p>
              </>
            )}
            {endpoint === "/api/monsters" && (
              <>
                <p>
                  <strong>Type:</strong> {cardA.type}
                </p>
                <p>
                  <strong>Size:</strong> {cardA.size}
                </p>
                <p>
                  <strong>CR:</strong> {cardA.challenge_rating}
                </p>
              </>
            )}
            {endpoint === "/api/classes" && (
              <>
                <p>
                  <strong>Hit Die:</strong> d{cardA.hit_die}
                </p>
              </>
            )}
          </div>

          <div className="compare-card">
            <h3>{cardB.name}</h3>
            {endpoint === "/api/spells" && (
              <>
                <p>
                  <strong>Level:</strong> {cardB.level}
                </p>
                <p>
                  <strong>School:</strong> {cardB.school?.name}
                </p>
                <p>{cardB.desc?.[0]}</p>
              </>
            )}
            {endpoint === "/api/monsters" && (
              <>
                <p>
                  <strong>Type:</strong> {cardB.type}
                </p>
                <p>
                  <strong>Size:</strong> {cardB.size}
                </p>
                <p>
                  <strong>CR:</strong> {cardB.challenge_rating}
                </p>
              </>
            )}
            {endpoint === "/api/classes" && (
              <>
                <p>
                  <strong>Hit Die:</strong> d{cardB.hit_die}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareModal;
