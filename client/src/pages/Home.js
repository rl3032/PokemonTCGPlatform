import React from "react";
import FeatureCards from "../components/FeatureCards";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="home-intro">
        <p>
          Welcome to PokeCollector, the ultimate platform for all Pokémon
          Trading Card Game (TCG) enthusiasts. Whether you are a seasoned
          trainer or just starting out, we have all the resources you need to
          succeed in your Pokémon adventures.
        </p>
        <p>
          Dive into our extensive collection of Pokémon cards, find rare and
          exotic cards, build powerful decks, and challenge other trainers in
          epic battles. Our platform is constantly updated with the latest cards
          and strategies, so you can stay ahead of the game.
        </p>
      </section>
      <div>
        <FeatureCards />
      </div>
    </div>
  );
}

export default Home;
