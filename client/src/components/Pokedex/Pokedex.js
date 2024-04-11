import React, { useState } from "react";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import "./Pokedex.css";

const Pokedex = ({ cards }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("name");
  const navigate = useNavigate();

  // Filter cards based on the search term
  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the cards based on the sort criteria and order
  const sortCards = (cards) => {
    return cards.sort((a, b) => {
      let valueA = a[sortCriteria];
      let valueB = b[sortCriteria];

      // Special handling for numerical values stored as strings
      if (sortCriteria === "hp" || sortCriteria === "price.market") {
        valueA = parseInt(valueA, 10);
        valueB = parseInt(valueB, 10);
      } else if (sortCriteria === "id") {
        const matchA = valueA.match(/\d+/);
        const matchB = valueB.match(/\d+/);
        if (matchA && matchB) {
          valueA = parseInt(matchA[0], 10);
          valueB = parseInt(matchB[0], 10);
        }
      } else if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };

  const sortedCards = sortCards(filteredCards);

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
      <div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="id">ID</option>
          <option value="hp">HP</option>
          <option value="price.market">Price</option>
        </select>
      </div>
      <div className="pokedex-container">
        {sortedCards.map((card) => (
          <div
            className="card-container"
            key={card.id}
            onClick={() => handleCardClick(card)}
          >
            <Card card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
