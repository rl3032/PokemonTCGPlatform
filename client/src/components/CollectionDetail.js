import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const CollectionDetail = ({
  card,
  onCardUpdate,
  userId,
  onUpdateUserCards,
}) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleAddToCollection = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user-cards/${userId}/add`,
        { cardId: card.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      onUpdateUserCards();
      onCardUpdate();
      alert(`Card ${card.name} added to collection successfully!`);
    } catch (error) {
      console.error("Error adding card to collection:", error);
      alert("Failed to add card to collection!");
    }
  };

  const handleRemoveFromCollection = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${card.name} from your collection?`
      )
    ) {
      try {
        const accessToken = await getAccessTokenSilently();
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/user-cards/${userId}/remove`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { cardId: card.id },
          }
        );
        onUpdateUserCards();
        onCardUpdate();
        alert("Card removed from collection successfully!");
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
        <button onClick={handleRemoveFromCollection}>
          Remove from Collection
        </button>
      </div>
    </div>
  );
};

export default CollectionDetail;
