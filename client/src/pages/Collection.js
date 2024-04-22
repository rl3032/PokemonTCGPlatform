import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import CollectionList from "../components/CollectionList";

const Collection = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${user.sub}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    if (user?.sub) {
      fetchUserId();
    }
  }, [user?.sub, getAccessTokenSilently]);

  return (
    <div>
      <CollectionList userId={userId} />
    </div>
  );
};

export default Collection;
