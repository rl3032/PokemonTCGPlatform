import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../contexts/AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";

const VerifyUser = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { setAccessToken } = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndCreateUser = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/verify-user`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auth0Id: user.sub,
              email: user.email,
              name: user.name,
            }),
          }
        );

        const userData = await response.json();
        if (!response.ok) throw new Error(userData.message);
        navigate("/app");
      } catch (error) {
        console.error("Verification failed:", error);
        navigate("/login");
      }
    };

    verifyAndCreateUser();
  }, [user, isAuthenticated, getAccessTokenSilently, setAccessToken, navigate]);

  return <div>Loading...</div>;
};

export default VerifyUser;
