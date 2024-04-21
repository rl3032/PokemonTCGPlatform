import React from "react";
import { useParams } from "react-router-dom";
import { useCards } from "../contexts/CardContext";
import "../styles/CardDetail.css";

const CardDetail = () => {
  const { id } = useParams();
  const { cards, isLoading } = useCards();
  const card = cards.find((card) => card.id === id);
  console.log(card);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!card) {
    return <h1>Card not found</h1>;
  }

  return (
    <div className="card-detail-container">
      <div className="card-image-container">
        <img src={card.imageUrl} alt={card.name} className="card-image" />
      </div>
      <div className="card-info-container">
        <h1>{card.name}</h1>
        <div className="price-info">
          <h2>Prices</h2>
          <p>
            <strong>Market:</strong> ${card.marketPrice}
          </p>
          <p>
            <strong>Low:</strong> ${card.lowPrice}
          </p>
          <p>
            <strong>Mid:</strong> ${card.midPrice}
          </p>
          <p>
            <strong>High:</strong> ${card.highPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
