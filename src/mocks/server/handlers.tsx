import { rest } from "msw";
import { getUser } from "../../utils/localStorage";
import questionMock from "../questionMock";
import user from "../userMock";

const BASE_URL = "http://localhost:3001";
const code = {
  OK: 200,
  CREATED: 201,
};

const handlers = [
  rest.post(`${BASE_URL}/sign_in`, (_req, res, ctx) => {
    return res(ctx.status(code.OK), ctx.json(user));
  }),

  rest.get(`${BASE_URL}/questions`, (req, res, ctx) => {
    const matches = req.url.searchParams.get("page");

    if (!matches) {
      return;
    }

    return res(ctx.status(code.OK), ctx.json(questionMock));
  }),
];

export default handlers;
