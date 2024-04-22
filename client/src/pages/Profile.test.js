import { render, screen } from "@testing-library/react";
import Profile from "../pages/Profile";
import { AuthTokenProvider } from "../contexts/AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";
import "@testing-library/jest-dom";

jest.mock("@auth0/auth0-react");

describe("Profile Page Tests", () => {
  beforeEach(() => {
    // Setup mock return values for Auth0 hook
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getAccessTokenSilently: jest.fn(),
    });
  });

  test("displays user information when logged in", () => {
    const { container } = render(
      <AuthTokenProvider>
        <Profile />
      </AuthTokenProvider>
    );

    console.log(container.innerHTML); // This will show you the full HTML output
    const userInfoDisplay = screen.getByText("Name: John Doe");
    expect(userInfoDisplay).toBeInTheDocument();
  });

  test("displays email and Auth0Id correctly", () => {
    render(
      <AuthTokenProvider>
        <Profile />
      </AuthTokenProvider>
    );

    const emailDisplay = screen.getByText(/john@example.com/);
    expect(emailDisplay).toBeInTheDocument();

    const auth0IdDisplay = screen.getByText(/Auth0Id:/);
    expect(auth0IdDisplay).toBeInTheDocument();
  });
});
