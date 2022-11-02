import { cleanup, screen, waitFor } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";
import { getUser, saveUser } from "../../../utils/localStorage";
import { memberUser } from "../../mocks/userMock";
import server from "../../mocks/server";
import { rest } from "msw";

const BASE_URL = "http://localhost:3001";
const code = { NOT_FOUND: 404 };

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

  it("Check if logged user redirects", async () => {
    saveUser(memberUser);
    const { history } = renderApp();
    expect(history.location.pathname).toBe("/member");
  });

  it("Login with wrong data trigger an error", async () => {
    server.use(
      rest.post(`${BASE_URL}/sign_in`, async (_req, res, ctx) => {
        return res.once(ctx.status(code.NOT_FOUND));
      })
    );
    const { user, container } = renderApp();
    const loginButton = screen.getByTestId("login_button");
    const emailInput = container.querySelector("#email") as Element;
    const passwordInput = container.querySelector("#password") as Element;

    await user.type(emailInput, "wrong@email.com");
    await user.type(passwordInput, "123456");
    await user.click(loginButton);

    expect(await screen.findByText("User not found")).toBeInTheDocument();
  });

  it("Login with wrong email or password format", async () => {
    const { user, container } = renderApp();
    const loginButton = screen.getByTestId("login_button");
    const emailInput = container.querySelector("#email") as Element;
    const passwordInput = container.querySelector("#password") as Element;

    await user.type(emailInput, "wrong@");
    await user.type(passwordInput, "123456");
    await user.click(loginButton);
    expect(await screen.findByText("Email is invalid")).toBeInTheDocument();

    await user.clear(emailInput);
    await user.clear(passwordInput);

    await user.type(emailInput, "email@email.com");
    await user.type(passwordInput, "123");
    await user.click(loginButton);
    expect(
      await screen.findByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });
});
