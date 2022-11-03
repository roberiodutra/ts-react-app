import { cleanup, screen, waitFor } from "@testing-library/react";
import App from "../../../App";
import renderWithRouter from "../../utils/renderWithRouter";
import { saveUser } from "../../../utils/localStorage";
import { adminUser, invalidUser, memberUser } from "../../mocks/userMock";
import questionMock from "../../mocks/questionMock";
import server from "../../mocks/server";
import { rest } from "msw";

const BASE_URL = "http://localhost:3001";
const code = { OK: 200 };

describe("Admin functions", () => {
  const renderApp = () => renderWithRouter(<App />, { route: "/admin" });

  afterEach(cleanup);

  it("Publish button", async () => {
    saveUser(adminUser);
    let mocks = questionMock;
    server.use(
      rest.get(`${BASE_URL}/questions`, (_req, res, ctx) => {
        return res(ctx.status(code.OK), ctx.json(mocks));
      }),
      rest.put(`${BASE_URL}/questions/:id`, (_req, res, ctx) => {
        mocks = {
          ...questionMock,
          questions: [{ ...questionMock.questions[0], status: "published" }],
        };
        return res(ctx.status(code.OK));
      })
    );
    const { user } = renderApp();
    const gearBtn = await screen.findByTestId("gear-actions");
    const publishBtn = await screen.findByRole("button", { name: "Publish" });
    const questionTitle = await screen.findByText("What is React?");

    expect(questionTitle).toBeInTheDocument();
    await user.click(gearBtn);
    await user.click(publishBtn);

    await waitFor(() => {
      expect(questionTitle).not.toBeInTheDocument();
    });
  });

  it("Edit button", async () => {
    saveUser(adminUser);
    const { user, history } = renderApp();
    const editBtn = await screen.findByText("Edit");

    await user.click(editBtn);
    expect(history.location.pathname).toBe(
      `/question/${questionMock.questions[0]._id}`
    );
  });

  it("Delete button", async () => {
    saveUser(adminUser);
    let mocks = questionMock;
    server.use(
      rest.get(`${BASE_URL}/questions`, (_req, res, ctx) => {
        return res(ctx.status(code.OK), ctx.json(mocks));
      }),
      rest.delete(`${BASE_URL}/questions/:id`, (req, res, ctx) => {
        const { id } = req.params;
        mocks = {
          ...questionMock,
          questions: questionMock.questions.filter(
            (element) => element._id !== id
          ),
        };
        return res(ctx.status(code.OK));
      })
    );
    const { user } = renderApp();
    const deleteBtn = await screen.findByText("Delete");
    const questionTitle = await screen.findByText("What is React?");

    expect(questionTitle).toBeInTheDocument();
    await user.click(deleteBtn);

    await waitFor(() => {
      expect(questionTitle).not.toBeInTheDocument();
    });
  });

  it("Invalid user is disconnected", async () => {
    server.use(
      rest.get(`${BASE_URL}/user/:id`, (_req, res, ctx) => {
        return res(ctx.status(code.OK), ctx.json(adminUser));
      })
    );
    saveUser(invalidUser);
    const { history } = renderApp();

    await waitFor(() => {
      expect(history.location.pathname).toBe("/sign_in");
    });
  });
});
