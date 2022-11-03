import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";
import questionMock from "../../mocks/questionMock";
import server from "../../mocks/server";
import { rest } from "msw";

const BASE_URL = "http://localhost:3001";
const code = { OK: 200 };

describe("Home page tests", () => {
  const renderApp = () => renderWithRouter(<App />);

  afterEach(cleanup);

  it("Check screen elements", async () => {
    const { getByText } = renderApp();
    expect(getByText("Questions")).toBeInTheDocument();
    expect(getByText("Answers")).toBeInTheDocument();
    expect(getByText("Author")).toBeInTheDocument();
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

  it("When there is no favicon, it offers a default", async () => {
    server.use(
      rest.get(`${BASE_URL}/questions`, (_req, res, ctx) => {
        return res(
          ctx.status(code.OK),
          ctx.json({
            total: questionMock.total,
            questions: [{ ...questionMock.questions[0], answer: "Not Found" }],
          })
        );
      })
    );
    const { findByRole } = renderApp();
    const IMG = (await findByRole("img", {
      name: "answer",
    })) as HTMLImageElement;

    fireEvent.error(IMG, { target: IMG });

    await waitFor(() => {
      expect(IMG.src).toEqual("http://localhost/src/assets/default-img.png");
    });
  });
});
