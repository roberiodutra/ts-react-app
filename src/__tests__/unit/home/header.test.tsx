import { cleanup, screen, waitFor } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";
import { saveUser } from "../../../utils/localStorage";
import { adminUser, memberUser } from "../../mocks/userMock";

describe("Header tests", () => {
  const renderApp = (route: string) => renderWithRouter(<App />, { route });

  afterEach(cleanup);

  it("Check home navbar elements", async () => {
    const { user, history } = renderApp("/");
    const contribute = screen.getByRole("button", { name: /contribute/i });
    const login = screen.getAllByRole("button", { name: /login/i })[0];
    const logo = screen.getByText("DevHelper");
    expect(contribute).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");

    await user.click(contribute);
    expect(history.location.pathname).toBe("/sign_up");

    history.push("/");
    await user.click(login);
    expect(history.location.pathname).toBe("/sign_in");
  });

  it("Check login navbar elements", async () => {
    const { user, history } = renderApp("/sign_in");
    const home = screen.getByRole("button", { name: /home/i });
    expect(home).toBeInTheDocument();

    await user.click(home);
    expect(history.location.pathname).toBe("/");
  });

  it("Check home navbar member area button", async () => {
    saveUser(adminUser);
    const { user, history } = renderApp("/");
    const memberArea = await screen.findByRole("button", {
      name: /member area/i,
    });
    await user.click(memberArea);
    expect(history.location.pathname).toBe("/admin");
  });

  it("Check admin navbar elements", async () => {
    saveUser(adminUser);
    const { user, history } = renderApp("/admin");
    const home = await screen.findByRole("button", { name: /home/i });
    const addQuestion = await screen.findByRole("button", {
      name: /add a question/i,
    });

    await user.click(addQuestion);
    const dashboard = await screen.findByRole("button", { name: /dashboard/i });
    expect(dashboard).toBeInTheDocument();

    await user.click(home);
    expect(history.location.pathname).toBe("/");
  });

  it("Check member navbar elements", async () => {
    saveUser(memberUser);
    const { user, history } = renderApp("/member");
    const addQuestion = await screen.findByRole("button", {
      name: /add a question/i,
    });
    const logout = await screen.findByRole("button", { name: /logout/i });

    await user.click(addQuestion);

    const myQuestions = await screen.findByRole("button", {
      name: /my questions/i,
    });
    expect(myQuestions).toBeInTheDocument();
    await user.click(myQuestions);

    expect(
      await screen.findByRole("button", {
        name: /add a question/i,
      })
    ).toBeInTheDocument();

    expect(logout).toBeInTheDocument();
    await user.click(logout);
    expect(history.location.pathname).toBe("/");
  });
});
