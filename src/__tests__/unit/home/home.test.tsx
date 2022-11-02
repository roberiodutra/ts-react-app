import { cleanup, screen } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";
import questionMock from "../../mocks/questionMock";

describe("Home page tests", () => {
  const renderApp = () => renderWithRouter(<App />);

  afterEach(cleanup);

  it("Check screen elements", async () => {
    renderApp();
    expect(screen.getByText("Questions")).toBeInTheDocument();
    expect(screen.getByText("Answers")).toBeInTheDocument();
    expect(screen.getByText("Author")).toBeInTheDocument();
  });

  it("Check home page items", async () => {
    const { findByText } = renderApp();
    await Promise.all(
      questionMock.questions.map(async (element) => {
        expect(await findByText(element.question)).toBeInTheDocument();
        expect(await findByText(element.question)).toHaveAttribute(
          "href",
          element.answer
        );
        expect(await findByText(element.author)).toBeInTheDocument();
      })
    );
  });
});
