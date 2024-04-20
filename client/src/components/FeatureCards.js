import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { cards } from "../data/CardsData";
import "../styles/FeatureCards.css";

function FeatureCards(onClick) {
  const randomCards = cards.sort(() => 0.5 - Math.random()).slice(0, 4);

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate(`/details/${card.id}`);
  };

  const handleSeeMoreClick = () => {
    navigate("/pokedex");
  };

  return (
    <section className="featured-cards">
      <div className="cards-container">
        {randomCards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
      <button className="see-more-btn" onClick={handleSeeMoreClick}>
        See More in Pokédex
      </button>
    </section>
  );
}

export default FeatureCards;
