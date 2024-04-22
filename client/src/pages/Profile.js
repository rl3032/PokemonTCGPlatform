import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import "../styles/Profile.css";

export default function Profile() {
  const { user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [newName, setNewName] = useState("");
  const [displayName, setDisplayName] = useState(user.name);

  useEffect(() => {
    setDisplayName(user.name);
  }, [user.name]);

  const handleNameChange = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();

    fetch(`${process.env.REACT_APP_API_URL}/user/${user.sub}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        email: user.email,
        name: newName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Name updated successfully!");
        setDisplayName(newName);
        getIdTokenClaims().then((updatedClaims) => {
          console.log("Updated claims:", updatedClaims);
        });
      })
      .catch((error) => {
        console.error("Error updating name:", error);
        alert("Failed to update name.");
      });
  };

  return (
    <div className="profile-container">
      <div>
        <p>Name: {displayName}</p>
        <form onSubmit={handleNameChange}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
          />
          <button type="submit">Change Name</button>
        </form>
      </div>
      <div>
        <p>📧 Email: {user.email}</p>
      </div>
      <div>
        <p>🔑 Auth0Id: {user.sub}</p>
      </div>
      <div>
        <p>✅ Email verified: {user.email_verified?.toString()}</p>
      </div>
    </div>
  );
}
