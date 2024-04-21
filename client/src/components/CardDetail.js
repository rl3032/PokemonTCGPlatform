import React from "react";
import { useParams } from "react-router-dom";
import { useCards } from "../CardContext";
import "../styles/CardDetail.css";

const CardDetail = () => {
  const { id } = useParams();
  const { cards } = useCards();
  const card = cards.find((card) => card.id === id);

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
            <strong>Market:</strong> ${card.price.market}
          </p>
          <p>
            <strong>Low:</strong> ${card.price.low}
          </p>
          <p>
            <strong>Mid:</strong> ${card.price.mid}
          </p>
          <p>
            <strong>High:</strong> ${card.price.high}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
