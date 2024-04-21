import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import CollectionDetail from "./CollectionDetail";
import UserCollection from "./UserCollection";
import "../styles/Collection.css";

const Collection = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cards")
      .then((response) => {
        setCards(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
        setIsLoading(false);
      });

    // Load user's collection
    axios
      .get("http://localhost:8000/user-cards")
      .then((response) => {
        setUserCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user cards:", error);
      });
  }, []);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="collection-layout">
      <div className="card-list">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardSelect(card)}
            className="card-item"
          >
            <Card card={card} />
          </div>
        ))}
      </div>
      <div className="right-panel">
        {selectedCard ? (
          <CollectionDetail card={selectedCard} />
        ) : (
          <div>Select a card to view details</div>
        )}
        <UserCollection cards={userCards} />
      </div>
    </div>
  );
};

export default Collection;
