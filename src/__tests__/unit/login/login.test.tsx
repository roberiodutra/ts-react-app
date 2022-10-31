import { screen } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";

describe("Login page tests", () => {
  it("Check screen elements", async () => {
    renderWithRouter(<App />, { route: "/sign_in" });
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("Check login and register buttons", async () => {
    const { user, path } = renderWithRouter(<App />, { route: "/sign_in" });
    const loginButton = screen.getByTestId("login_button");
    const registerButton = screen.getByTestId("register_button");

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();

    user.click(loginButton);
    expect(screen.getByLabelText("Passwd")).toBeInTheDocument();
  });
});
