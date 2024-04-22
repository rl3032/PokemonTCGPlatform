import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Login.css";

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/app");
  }

  return (
    <div className="login">
      <h1>Welcome to the Pokémon TCG Platform</h1>
      <div>
        {!isAuthenticated ? (
          <button className="button" onClick={loginWithRedirect}>
            Log In / Sign Up
          </button>
        ) : (
          <button className="button" onClick={() => navigate("/app")}>
            Enter App
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
