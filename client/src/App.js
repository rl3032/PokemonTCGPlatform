import React from "react";
import "./App.css";
import Card from "./Card";

const cards = [
  {
    id: "base1-4",
    name: "Charizard",
    hp: "120",
    types: ["Fire"],
    abilities: [
      {
        name: "Energy Burn",
        text: "As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into Fire Energy for the rest of the turn. This power can't be used if Charizard is Asleep, Confused, or Paralyzed.",
        type: "Pokémon Power",
      },
    ],
    attacks: [
      {
        name: "Fire Spin",
        cost: ["Fire", "Fire", "Fire", "Fire"],
        convertedEnergyCost: 4,
        damage: "100",
        text: "Discard 2 Energy cards attached to Charizard in order to use this attack.",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/4.png",
    price: {
      low: 250,
      mid: 313.19,
      high: 999.0,
      market: 386.97,
    },
  },
  {
    id: "base1-2",
    name: "Blastoise",
    hp: "100",
    types: ["Water"],
    abilities: [
      {
        name: "Rain Dance",
        text: "As often as you like during your turn (before your attack), you may attach 1 Water Energy card to 1 of your Water Pokémon. (This doesn't use up your 1 Energy card attachment for the turn.) This power can't be used if Blastoise is Asleep, Confused, or Paralyzed.",
        type: "Pokémon Power",
      },
    ],
    attacks: [
      {
        name: "Hydro Pump",
        cost: ["Water", "Water", "Water"],
        convertedEnergyCost: 3,
        damage: "40+",
        text: "Does 40 damage plus 10 more damage for each Water Energy attached to Blastoise but not used to pay for this attack's Energy cost. Extra Water Energy after the 2nd doesn't count.",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/2.png",
    price: {
      low: 73.23,
      mid: 104.0,
      high: 194.79,
      market: 118.7,
    },
  },
  {
    id: "base1-15",
    name: "Venusaur",
    hp: "100",
    types: ["Grass"],
    abilities: [
      {
        name: "Energy Trans",
        text: "As often as you like during your turn (before your attack), you may take 1 Grass Energy card attached to 1 of your Pokémon and attach it to a different one. This power can't be used if Venusaur is Asleep, Confused, or Paralyzed.",
        type: "Pokémon Power",
      },
    ],
    attacks: [
      {
        name: "Solarbeam",
        cost: ["Grass", "Grass", "Grass", "Grass"],
        convertedEnergyCost: 4,
        damage: "60+",
        text: "Does 60 damage plus 10 more damage for each Grass Energy attached to Venusaur but not used to pay for this attack's Energy cost. You can't add more than 20 damage in this way.",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/15.png",
    price: {
      low: 49.95,
      mid: 79.99,
      high: 249.98,
      market: 94.07,
    },
  },
  {
    id: "base1-8",
    name: "Machamp",
    hp: "100",
    types: ["Fighting"],
    abilities: [
      {
        name: "Strikes Back",
        text: "Whenever your opponent's attack damages Machamp (even if Machamp is Knocked Out), this power does 10 damage to the attacking Pokémon. (Don't apply Weakness and Resistance.) This power can't be used if Machamp is Asleep, Confused, or Paralyzed when your opponent attacks.",
        type: "Pokémon Power",
      },
    ],
    attacks: [
      {
        name: "Seismic Toss",
        cost: ["Fighting", "Fighting", "Fighting", "Colorless"],
        convertedEnergyCost: 4,
        damage: "60",
        text: "",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/8.png",
    price: {
      low: 57.0,
      mid: 90.0,
      high: 199.99,
      market: 89.0,
    },
  },
];

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
