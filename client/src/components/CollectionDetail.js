import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const CollectionDetail = ({ card, onCardUpdate }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${user.sub}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserId(response.data.userId); // Ensure this is set correctly based on your API response structure
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
        alert("Failed to fetch user information.");
      }
    };

    if (user?.sub) {
      fetchUserId();
    }
  }, [user?.sub, getAccessTokenSilently]);

  const handleAddToCollection = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user-cards/${userId}/add`,
        {
          cardId: card.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Card added to collection:", data);
      alert(`Card ${card.name} added to collection successfully!`);
      onCardUpdate();
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
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: { cardId: card.id },
          }
        );
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
        <button onClick={handleRemoveFromCollection}>
          Remove from Collection
        </button>
      </div>
    </div>
  );
};

export default CollectionDetail;
