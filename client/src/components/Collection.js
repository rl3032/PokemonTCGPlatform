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
    const fetchCards = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/cards`
        );
        setCards(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setIsLoading(false);
      }
    };

    fetchCards();
    fetchUserCards();
  }, []);

  const fetchUserCards = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user-cards/:userId`
      );
      setUserCards(data);
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
  };

  const handleCardSelect = async (card) => {
    setSelectedCard(card);
    try {
      const { data } = await axios.get(`http://localhost:8000/user-cards/1`);
      setUserCards(data);
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
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
          <CollectionDetail
            card={selectedCard}
            onCardUpdate={handleCardSelect}
          />
        ) : (
          <div>Select a card to view details</div>
        )}
        <UserCollection cards={userCards} onSelectCard={handleCardSelect} />
      </div>
    </div>
  );
};

export default Collection;
