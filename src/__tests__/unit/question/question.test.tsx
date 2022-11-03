import { cleanup, screen, waitFor } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";
import { saveUser } from "../../../utils/localStorage";
import { adminUser, memberUser } from "../../mocks/userMock";

describe("Question form tests", () => {
  const renderApp = (route: string) => renderWithRouter(<App />, { route });

  afterEach(cleanup);

  it("Check screen elements", async () => {
    saveUser(memberUser);
    const { user } = renderApp("/member");
    const addQuestion = await screen.findByRole("button", {
      name: /add a question/i,
    });
    await user.click(addQuestion);

    const questionLabel = screen.getByLabelText("Question");
    const answerLabel = screen.getByLabelText("Answer(link)");
    const sendButton = screen.getByRole("button", { name: /send/i });

    await user.type(questionLabel, "any questions for the developers");
    await user.type(answerLabel, "https://google.com/response-for-developers");
    await user.click(sendButton);

    expect(screen.getByText("Post a Question")).toBeInTheDocument();
    await waitFor(() => {
      expect(questionLabel).toHaveValue("");
      expect(answerLabel).toHaveValue("");
    });
  });

  it("Error when inputs values are incorrectly", async () => {
    saveUser(memberUser);
    const { user } = renderApp("/member");
    const addQuestion = await screen.findByRole("button", {
      name: /add a question/i,
    });
    await user.click(addQuestion);

    const questionLabel = screen.getByLabelText("Question");
    const answerLabel = screen.getByLabelText("Answer(link)");
    const sendButton = screen.getByRole("button", { name: /send/i });

    await user.type(questionLabel, "wrong");
    await user.type(answerLabel, "wrong");
    await user.click(sendButton);

    await waitFor(() => {
      expect(
        screen.getByText("Question must be at least 20 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Answer must be at least 20 characters")
      ).toBeInTheDocument();
    });
  });
});
