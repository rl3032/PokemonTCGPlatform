import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "./Card";
import CollectionDetail from "./CollectionDetail";
import UserCollection from "./UserCollection";
import "../styles/Collection.css";

const CollectionList = ({ userId }) => {
  const [allCards, setAllCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchAllCards = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/cards`
      );
      setAllCards(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching all cards:", error);
      setIsLoading(false);
    }
  };

  const fetchUserCards = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user-cards/${userId}`
        );
        setUserCards(response.data);
      } catch (error) {
        console.error("Error fetching user cards:", error);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchUserCards();
  }, [fetchUserCards]);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="collection-layout">
      <div className="left-panel">
        {allCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardSelect(card)}
          />
        ))}
      </div>
      <div className="right-panel">
        {selectedCard && (
          <CollectionDetail
            card={selectedCard}
            onCardUpdate={handleCardSelect}
            onUpdateUserCards={fetchUserCards}
            userId={userId}
          />
        )}
        <UserCollection cards={userCards} onSelectCard={handleCardSelect} />
      </div>
    </div>
  );
};

export default CollectionList;
