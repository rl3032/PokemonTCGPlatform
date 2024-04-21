import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import { CardsProvider } from "./CardContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Market from "./components/Market";
import Pokedex from "./components/Pokedex";
import CardDetail from "./components/CardDetail";
import VerifyUser from "./components/VerifyUser";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AppLayout from "./components/AppLayout";
import AuthDebugger from "./components/AuthDebugger";

const container = document.getElementById("root");

// Configure Auth0Provider with environment variables
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const auth0Audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const requestedScopes = ["profile", "email"];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  // If the user is not authenticated, redirect to the home page
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, display the children (the protected page)
  return children;
}

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: auth0Audience,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <CardsProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokedex" element={<Pokedex />} />

              <Route
                path="/app"
                element={
                  <RequireAuth>
                    <AppLayout />
                  </RequireAuth>
                }
              />

              <Route path="/market" element={<Market />} />
              <Route path="/verify-user" element={<VerifyUser />} />
              <Route path="/auth-debugger" element={<AuthDebugger />} />
              <Route path="/details/:id" element={<CardDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CardsProvider>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>
);
