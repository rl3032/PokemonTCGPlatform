import React from "react";
import { useParams } from "react-router-dom";
import { cards } from "../data/CardsData";
import "../styles/CardDetail.css";

const CardDetail = () => {
  const { id } = useParams();
  const card = cards.find((card) => card.id === id);

  if (!card) {
    return <div>Card not found!</div>;
  }

  return (
    <div className="card-detail-container">
      <div className="card-image-container">
        <img src={card.imageUrl} alt={card.name} className="card-image" />
      </div>
      <div className="card-info-container">
        <h1>{card.name}</h1>
        <p>
          <strong>HP:</strong> {card.hp}
        </p>
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
        <div className="abilities">
          <h3>Abilities</h3>
          {card.abilities.map((ability, index) => (
            <p key={index}>
              <strong>{ability.name}:</strong> {ability.text}
            </p>
          ))}
        </div>
        <div className="attacks">
          <h3>Attacks</h3>
          {card.attacks.map((attack, index) => (
            <p key={index}>
              <strong>{attack.name}:</strong> {attack.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
