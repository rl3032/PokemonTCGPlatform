import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import "../styles/Pokedex.css";

const Pokedex = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("name");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/cards-range")
      .then((response) => {
        setCards(response.data.filter((card) => card !== null && card.name)); // Ensure that card is not null and has a name
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setIsLoading(false);
      });
  }, []);

  // Filter cards based on the search term and ensure all cards are valid
  const filteredCards = cards.filter(
    (card) =>
      card &&
      card.name &&
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the cards based on the sort criteria and order
  const sortCards = (cards) => {
    return cards.sort((a, b) => {
      let valueA = a[sortCriteria];
      let valueB = b[sortCriteria];

      if (valueA && valueB) {
        // Check if values are not null
        if (["hp", "marketPrice"].includes(sortCriteria)) {
          valueA = parseInt(valueA, 10);
          valueB = parseInt(valueB, 10);
        } else if (sortCriteria === "id") {
          valueA = parseInt(valueA.match(/\d+/)[0], 10);
          valueB = parseInt(valueB.match(/\d+/)[0], 10);
        } else {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }

        return sortOrder === "asc"
          ? valueA > valueB
            ? 1
            : -1
          : valueA < valueB
          ? 1
          : -1;
      }
      return 0;
    });
  };

  const sortedCards = sortCards(filteredCards);

  const handleCardClick = (card) => {
    navigate(`/details/${card.id}`);
  };

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>An error occurred: {error}</div>;

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
          <option value="marketPrice">Price</option>
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
