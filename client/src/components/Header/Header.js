function Header() {
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

export default Header;
