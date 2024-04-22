import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const CollectionDetail = ({ card, onCardUpdate }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  // Use auth0 to get the user's auth0Id
  const { user } = useAuth0();
  const userId = user.sub;

  const handleAddToCollection = async () => {
    try {
      const { data } = await axios.post(`${apiUrl}/user-cards/${userId}/add`, {
        cardId: card.id,
        quantity: 1, // Default quantity when adding new card
      });
      console.log("Card added to collection:", data);
      alert(`Card ${card.name} added to collection successfully!`);
      onCardUpdate();
    } catch (error) {
      console.error("Error adding card to collection:", error);
      alert("Failed to add card to collection!");
    }
  };

  const handleUpdateQuantity = async (newQuantity) => {
    try {
      const { data } = await axios.put(
        `${apiUrl}/user-cards/${userId}/update`,
        {
          cardId: card.id,
          quantity: newQuantity,
        }
      );
      console.log("Card quantity updated:", data);
      alert(`Card ${card.name} quantity updated successfully!`);
      onCardUpdate();
    } catch (error) {
      console.error("Error updating card quantity:", error);
      alert("Failed to update card quantity!");
    }
  };

  const handleRemoveFromCollection = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${card.name} from your collection?`
      )
    ) {
      try {
        await axios.delete(`${apiUrl}/user-cards/${userId}/remove`, {
          data: { cardId: card.id },
        });
        console.log("Card removed from collection:", card.id);
        alert("Card removed from collection successfully!");
        onCardUpdate();
      } catch (error) {
        console.error("Error removing card from collection:", error);
        alert("Failed to remove card from collection!");
      }
    }
  };

  return (
    <div className="card-info">
      <h3>{card.name}</h3>
      <p>Type: {card.types}</p>
      <p>HP: {card.hp}</p>
      <p>Market Price: ${card.marketPrice}</p>
      <div className="buttons">
        <button onClick={handleAddToCollection}>Add to Collection</button>
        <button
          onClick={() => handleUpdateQuantity(prompt("Enter new quantity:", 1))}
        >
          Update Card Quantities
        </button>
        <button onClick={handleRemoveFromCollection}>
          Remove from Collection
        </button>
      </div>
    </div>
  );
};

export default CollectionDetail;
