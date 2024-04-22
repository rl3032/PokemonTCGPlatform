import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../contexts/AuthTokenContext";

const VerifyUser = () => {
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndCreateUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
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
    if (accessToken) {
      verifyAndCreateUser();
    }
  }, [accessToken, navigate]);

  return <div>Loading...</div>;
};

export default VerifyUser;
