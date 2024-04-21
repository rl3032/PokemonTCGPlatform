import React from "react";
import axios from "axios";

const CollectionDetail = ({ card }) => {
  const apiUrl = "http://localhost:8000";

  const handleCreate = async () => {
    try {
      const { data } = await axios.post(`${apiUrl}/cards`, card);
      console.log("Card created:", data);
      alert(`Card ${data.name} added successfully!`);
    } catch (error) {
      console.error("Error creating card:", error);
      alert("Failed to add card!");
    }
  };

  const handleUpdate = async () => {
    const newPrice = prompt("Enter new market price:", card.marketPrice);
    if (newPrice) {
      try {
        const { data } = await axios.put(`${apiUrl}/cards/${card.id}`, {
          ...card,
          marketPrice: newPrice,
        });
        console.log("Card updated:", data);
        alert(`Card ${data.name} updated successfully!`);
      } catch (error) {
        console.error("Error updating card:", error);
        alert("Failed to update card!");
      }
    }
  };

  const handleDelete = async () => {
    // Implement delete logic
    if (window.confirm(`Are you sure you want to delete ${card.name}?`)) {
      try {
        await axios.delete(`${apiUrl}/cards/${card.id}`);
        console.log("Card deleted:", card.id);
        alert("Card deleted successfully!");
      } catch (error) {
        console.error("Error deleting card:", error);
        alert("Failed to delete card!");
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
        <button onClick={handleCreate}>Add Card</button>
        <button onClick={handleUpdate}>Update Card</button>
        <button onClick={handleDelete}>Delete Card</button>
      </div>
    </div>
  );
};

export default CollectionDetail;
