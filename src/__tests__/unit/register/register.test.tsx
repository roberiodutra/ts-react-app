import { cleanup, screen } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";
import { memberUser } from "../../mocks/userMock";
import server from "../../mocks/server";
import { rest } from "msw";
import { UserRegisterType } from "../../../types/UserRegisterType";

const BASE_URL = "http://localhost:3001";
const code = { CONFLICT: 409 };

describe("Register page tests", () => {
  const renderApp = () =>
    renderWithRouter(<App />, {
      route: "/sign_up",
    });

  afterEach(cleanup);

  it("Check screen elements", async () => {
    renderApp();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("Check account created successfully", async () => {
    const { user, history, container } = renderApp();
    const registerButton = screen.getByText("Register");
    const firstNameInput = container.querySelector("#first-name") as Element;
    const lastNameInput = container.querySelector("#last-name") as Element;
    const emailInput = container.querySelector("#email") as Element;
    const passwordInput = container.querySelector("#password") as Element;
    const confirmPasswordInput = container.querySelector(
      "#confirm-password"
    ) as Element;

    await user.type(firstNameInput, "NewUser");
    await user.type(lastNameInput, "Register");
    await user.type(emailInput, "newuser@email.com");
    await user.type(passwordInput, memberUser.password);
    await user.type(confirmPasswordInput, memberUser.password);

    await user.click(registerButton);
    expect(history.location.pathname).toBe("/member");
  });

  it("Check if buttons redirects", async () => {
    const { user, history } = renderApp();
    expect(screen.getByText("Have an account?")).toBeInTheDocument();
    const loginButton = screen.getByText("Sign In");
    await user.click(loginButton);
    expect(history.location.pathname).toBe("/sign_in");
  });

  it("Register with existing user returns error", async () => {
    server.use(
      rest.post(`${BASE_URL}/sign_up`, async (_req, res, ctx) => {
        return res.once(ctx.status(code.CONFLICT));
      })
    );
    const { user, container } = renderApp();
    const registerButton = screen.getByText("Register");
    const firstNameInput = container.querySelector("#first-name") as Element;
    const lastNameInput = container.querySelector("#last-name") as Element;
    const emailInput = container.querySelector("#email") as Element;
    const passwordInput = container.querySelector("#password") as Element;
    const confirmPasswordInput = container.querySelector(
      "#confirm-password"
    ) as Element;

    await user.type(firstNameInput, "Member");
    await user.type(lastNameInput, "Tester");
    await user.type(emailInput, memberUser.email);
    await user.type(passwordInput, memberUser.password);
    await user.type(confirmPasswordInput, memberUser.password);

    await user.click(registerButton);

    expect(await screen.findByText("User already exists")).toBeInTheDocument();
  });

  it("Register with wrong data", async () => {
    const { user, container } = renderApp();
    const registerButton = screen.getByText("Register");
    const firstNameInput = container.querySelector("#first-name") as Element;
    const lastNameInput = container.querySelector("#last-name") as Element;
    const emailInput = container.querySelector("#email") as Element;
    const passwordInput = container.querySelector("#password") as Element;
    const confirmPasswordInput = container.querySelector(
      "#confirm-password"
    ) as Element;

    const dataTester = async (data: UserRegisterType) => {
      await user.type(firstNameInput, data.firstName);
      await user.type(lastNameInput, data.lastName);
      await user.type(emailInput, data.email);
      await user.type(passwordInput, data.password);
      await user.type(confirmPasswordInput, data.confirmPassword);
      await user.click(registerButton);
    };

    const clearInputs = async () => {
      await user.clear(firstNameInput);
      await user.clear(lastNameInput);
      await user.clear(emailInput);
      await user.clear(passwordInput);
      await user.clear(confirmPasswordInput);
    };

    const newUser = {
      firstName: "Tester",
      lastName: "Member",
      email: memberUser.email,
      password: memberUser.password,
      confirmPassword: memberUser.password,
    };

    await dataTester({ ...newUser, firstName: "err" });
    expect(
      await screen.findByText("First name must be at least 6 characters")
    ).toBeInTheDocument();

    await clearInputs();
    await dataTester({ ...newUser, lastName: "err" });
    expect(
      await screen.findByText("Last name must be at least 6 characters")
    ).toBeInTheDocument();

    await clearInputs();
    await dataTester({ ...newUser, email: "wrong" });
    expect(await screen.findByText("Email is invalid")).toBeInTheDocument();

    await clearInputs();
    await dataTester({ ...newUser, password: "1234" });
    expect(
      await screen.findByText("Password must be at least 6 characters")
    ).toBeInTheDocument();

    await clearInputs();
    await dataTester({ ...newUser, password: "999999" });
    expect(
      await screen.findByText("Confirm Password does not match")
    ).toBeInTheDocument();
  });
});
