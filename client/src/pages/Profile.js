import { useAuth0 } from "@auth0/auth0-react";

import "../styles/Profile.css";

export default function Profile() {
  const { user } = useAuth0();

  return (
    <div className="profile-container">
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
