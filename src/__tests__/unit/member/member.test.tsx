import { cleanup } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";

describe("Member page tests", () => {
  const renderApp = () => renderWithRouter(<App />, { route: "/member" });

  afterEach(cleanup);

  it("Redirect to login if user not logged in", async () => {
    const { history } = renderApp();
    expect(history.location.pathname).toBe("/sign_in");
  });
});
