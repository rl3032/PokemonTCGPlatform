import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";

jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Login component tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
    });
    useNavigate.mockReturnValue(jest.fn());
  });

  it("calls loginWithRedirect when login button is clicked", () => {
    const loginWithRedirect = jest.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect,
    });

    render(<Login />);
    fireEvent.click(screen.getByText(/log in \/ sign up/i));
    expect(loginWithRedirect).toHaveBeenCalled();
  });

  it("navigates to /app when user is authenticated", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<Login />);
    expect(navigate).toHaveBeenCalledWith("/app");
  });

  it("calls navigate to /app when enter app button is clicked", () => {
    const navigate = jest.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    useNavigate.mockReturnValue(navigate);

    render(<Login />);
    fireEvent.click(screen.getByText(/enter app/i));
    expect(navigate).toHaveBeenCalledWith("/app");
  });
});
