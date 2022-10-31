import { rest } from "msw";
import { getUser } from "../../utils/localStorage";

const BASE_URL = "http://localhost:3001";
const code = {
  OK: 200,
  CREATED: 201,
};

const handlers = [
  rest.post(`${BASE_URL}/sign_in`, (_req, res, ctx) =>
    res(ctx.status(code.OK), ctx.json(getUser()))
  ),
];

export default handlers;
