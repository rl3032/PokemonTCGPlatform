import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/AppLayout.css";

export default function AppLayout() {
  const { user, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokémon TCG Platform</h1>
        <nav className="app-nav">
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/app/todos">TODOs</Link>
            </li>
            <li>
              <Link to="/auth-debugger">Auth Debugger</Link>
            </li>
            <li>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
        <div className="welcome-message">Welcome, {user.name}</div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
