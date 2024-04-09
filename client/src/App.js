import React from "react";
import "./App.css";
import Card from "./Card";

export function Header() {
  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <nav className="navigation-menu">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/pokedex">Pokédex</a>
          </li>
          <li>
            <a href="/deck-builder">Deck Builder</a>
          </li>
          <li>
            <a href="/market">Market</a>
          </li>
        </ul>
      </nav>
      <div className="login">
        <a href="/login">Log in</a>
      </div>
    </header>
  );
}

export function FeatureCards() {
  const cards = [
    {
      id: 1,
      name: "Charmander",
      imageUrl: "https://images.pokemontcg.io/base1/46.png",
    },
    {
      id: 2,
      name: "Charmander",
      imageUrl: "https://images.pokemontcg.io/base1/46.png",
    },
    {
      id: 3,
      name: "Charmander",
      imageUrl: "https://images.pokemontcg.io/base1/46.png",
    },
    {
      id: 4,
      name: "Charmander",
      imageUrl: "https://images.pokemontcg.io/base1/46.png",
    },
  ];

  const handleCardClick = (card) => {
    // Define what happens when a card is clicked
    // For instance, navigate to the card's detail page or show a modal
    console.log(card.name);
  };

  return (
    <section className="featured-cards">
      <div className="cards-container">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
      <button className="see-more-btn">See More in Pokédex</button>
    </section>
  );
}

export function FlashSale() {
  const flashSaleCard = {
    id: "base1-44",
    name: "Bulbasaur",
    imageUrl: "https://images.pokemontcg.io/base1/44.png",
    endDateTime: "2024-03-21T23:59:59",
  };

  const handleCardClick = (card) => {
    // Define what happens when a card is clicked
    // For instance, navigate to the card's detail page or show a modal
    console.log(card.name);
  };

  return (
    <div className="flash-sale-container">
      <Card
        key={flashSaleCard.id}
        card={flashSaleCard}
        onClick={handleCardClick}
        saleEndTime={flashSaleCard.endDateTime}
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Terms and Conditions</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="App">
      <Header />
      <FeatureCards />
      <FlashSale />
      <Footer />
    </div>
  );
}
