import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../styles/FlashSale.css";

function FlashSale() {
  const flashSaleCard = {
    id: "base1-44",
    name: "Bulbasaur",
    hp: "40",
    types: ["Grass"],
    abilities: [],
    attacks: [
      {
        name: "Leech Seed",
        cost: ["Grass", "Colorless"],
        convertedEnergyCost: 2,
        damage: "30",
        text: "Unless all damage from this attack is prevented, you may remove 1 damage counter from Bulbasaur.",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/44.png",
  };

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate(`/details/${card.id}`);
  };

  const handleGoToMarketClick = () => {
    navigate("/market");
  };

  return (
    <div className="flash-sale-container">
      <Card
        key={flashSaleCard.id}
        card={flashSaleCard}
        onClick={handleCardClick}
      />
      <button onClick={handleGoToMarketClick} className="go-to-market-btn">
        Go to Market
      </button>
    </div>
  );
}

export default FlashSale;
