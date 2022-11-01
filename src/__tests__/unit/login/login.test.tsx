import { cleanup, screen, waitFor } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";

describe("Login page tests", () => {
  const renderApp = () =>
    renderWithRouter(<App />, {
      route: "/sign_in",
    });

  afterEach(cleanup);

  it("Check screen elements", async () => {
    renderApp();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("Check admin login successfully", async () => {
    const { user, history, container } = renderApp();
    const loginButton = screen.getByTestId("login_button");
    const emailInput = container.querySelector("#email") as Element;
    const passwordInput = container.querySelector("#password") as Element;

    await user.type(emailInput, "admin@email.com");
    await user.type(passwordInput, "123456");
    await user.click(loginButton);

    expect(history.location.pathname).toBe("/admin");
  });
});
