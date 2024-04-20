import React from "react";

function Card({ card, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(card);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={card.imageUrl} alt={card.name} />
    </div>
  );
}

export default Card;
