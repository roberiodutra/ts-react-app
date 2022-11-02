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
    const { findAllByRole, findAllByText } = renderApp();
    await Promise.all(
      questionMock.questions.map(async (element) => {
        const allQuestions = await findAllByRole("link", {
          name: element.question,
        });
        const allAuthors = await findAllByText(element.author);
        allQuestions.every((question) => {
          expect(question).toBeInTheDocument();
          expect(question).toHaveAttribute("href", element.answer);
        });
        allAuthors.every((author) => expect(author).toBeInTheDocument());
      })
    );
  });
});
