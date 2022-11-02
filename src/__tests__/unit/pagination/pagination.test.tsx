import { cleanup } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";
import questionMock from "../../mocks/questionMock";

describe("Pagination tests on Home page", () => {
  const renderApp = () => renderWithRouter(<App />);

  afterEach(cleanup);

  it("Test pagination Buttons", async () => {
    const { user, findByRole } = renderApp();
    const prevButton = await findByRole("button", { name: "↙" });
    const nextButton = await findByRole("button", { name: "↗" });

    const ActiveButton = async (name: string) => {
      expect(await findByRole("button", { name })).toHaveClass("active");
    };

    expect(prevButton).toBeDisabled();
    await ActiveButton("1");

    await user.click(nextButton);
    await ActiveButton("2");

    await user.click(prevButton);
    await ActiveButton("1");

    await user.click(await findByRole("button", { name: "3" }));
    await ActiveButton("3");
  });
});
