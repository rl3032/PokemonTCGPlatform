// Card.js
import React from "react";

function Card({ card, onClick }) {
  return (
    <div className="card" onClick={() => onClick(card)}>
      <img src={card.imageUrl} alt={card.name} />
    </div>
  );
}

export default Card;
