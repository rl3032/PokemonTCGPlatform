import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import AppLayout from "./components/AppLayout";
import CardDetail from "./components/CardDetail";
import Pokedex from "./components/Pokedex";
import VerifyUser from "./components/VerifyUser";
import AuthDebugger from "./components/AuthDebugger";
import NotFound from "./components/NotFound";
import App from "./App";

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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/verify-user" element={<VerifyUser />} />
            <Route
              path="app"
              element={
                <RequireAuth>
                  <AppLayout />
                </RequireAuth>
              }
            >
              <Route path="pokedex" element={<Pokedex />} />
              <Route path="details/:id" element={<CardDetail />} />
              <Route path="debugger" element={<AuthDebugger />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>
);
