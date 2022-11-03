import { cleanup, screen, waitFor } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";
import { saveUser } from "../../../utils/localStorage";
import { adminUser, memberUser } from "../../mocks/userMock";
import questionMock from "../../mocks/questionMock";

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

    await user.type(questionLabel, "any question for developers");
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

  it("Edit question page screen elements", async () => {
    saveUser(memberUser);
    renderApp("/question/6355da1a603sf6d6sdg450c011");
    expect(await screen.findByText("Editor Mode")).toBeInTheDocument();
    expect(await screen.findByLabelText("Question")).toBeInTheDocument();
    expect(await screen.findByLabelText("Answer")).toBeInTheDocument();
  });

  it("Edit question success", async () => {
    saveUser(adminUser);
    const { user, history } = renderApp("/question/6355da1a603sf6d6sdg450c011");
    const questionLabel = await screen.findByLabelText("Question");
    const answerLabel = await screen.findByLabelText("Answer");
    const saveButton = await screen.findByRole("button", { name: /save/i });

    expect(questionLabel).toHaveValue(questionMock.questions[1].question);
    expect(answerLabel).toHaveValue(questionMock.questions[1].answer);

    await user.clear(questionLabel);
    await user.clear(answerLabel);
    await user.type(questionLabel, "Edit question for developers");
    await user.type(answerLabel, "https://google.com/response-for-developers");
    await user.click(saveButton);

    expect(history.location.pathname).toBe("/admin");
  });

  it(" Error when editing with invalid data", async () => {
    saveUser(adminUser);
    const { user } = renderApp("/question/6355da1a603sf6d6sdg450c011");
    const questionLabel = await screen.findByLabelText("Question");
    const answerLabel = await screen.findByLabelText("Answer");
    const saveButton = await screen.findByRole("button", { name: /save/i });

    await user.clear(questionLabel);
    await user.clear(answerLabel);
    await user.type(questionLabel, "wrong");
    await user.type(answerLabel, "wrong");
    await user.click(saveButton);

    expect(
      await screen.findByText("Question must be at least 20 characters")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Answer must be at least 20 characters")
    ).toBeInTheDocument();
  });
});
