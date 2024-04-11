import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img
          src="/logo.png"
          alt="Pokémon Trading Card Game Logo"
          className="logo"
        />
      </Link>
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

export default Header;
