import React from "react";
import { useParams } from "react-router-dom";
import { useCards } from "../contexts/CardContext";
import "../styles/CardDetail.css";

const CardDetail = () => {
  const { id } = useParams();
  const { cards, isLoading } = useCards();
  const card = cards.find((card) => card.id === id);

  if (isLoading) {
    return (
      <div className="loading-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="error-container">
        <h1>Card not found</h1>
      </div>
    );
  }

  return (
    <div className="card-detail-container">
      <div className="card-image-container">
        <img src={card.imageUrl} alt="" className="card-image" />
      </div>
      <div className="card-info-container">
        <h1 className="card-name">{card.name}</h1>
        <div className="price-info">
          <h2>Prices</h2>
          <ul className="price-list">
            <li>
              <strong>Market:</strong> ${card.marketPrice}
            </li>
            <li>
              <strong>Low:</strong> ${card.lowPrice}
            </li>
            <li>
              <strong>Mid:</strong> ${card.midPrice}
            </li>
            <li>
              <strong>High:</strong> ${card.highPrice}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
