import React, { useState } from "react";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import "./Pokedex.css";

const Pokedex = ({ cards }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  // Filter cards based on the search term
  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the cards based on the name
  const sortedCards = filteredCards.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const handleCardClick = (card) => {
    navigate(`/details/${card.id}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <div className="pokedex-container">
        {sortedCards.map((card) => (
          <div
            className="card-container"
            key={card.id}
            onClick={() => handleCardClick(card)}
          >
            <Card card={card} onClick={handleCardClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
