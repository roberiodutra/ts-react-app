import { rest } from "msw";
import { getUser } from "../../../utils/localStorage";
import questionMock from "../questionMock";
import { adminUser, memberUser } from "../userMock";

const BASE_URL = "http://localhost:3001";
const code = {
  OK: 200,
  CREATED: 201,
};

const handlers = [
  rest.post(`${BASE_URL}/sign_in`, (_req, res, ctx) => {
    return res(ctx.status(code.OK), ctx.json(adminUser));
  }),

  rest.post(`${BASE_URL}/sign_up`, (_req, res, ctx) => {
    return res(ctx.status(code.OK), ctx.json(memberUser));
  }),

  rest.get(`${BASE_URL}/questions`, (_req, res, ctx) => {
    return res(ctx.status(code.OK), ctx.json(questionMock));
  }),

  rest.post(`${BASE_URL}/questions`, (_req, res, ctx) => {
    return res(ctx.status(code.OK));
  }),

  rest.get(`${BASE_URL}/questions/:id`, (_req, res, ctx) => {
    return res(ctx.status(code.OK), ctx.json(questionMock));
  }),

  rest.get(`${BASE_URL}/user/:id`, (_req, res, ctx) => {
    return res(ctx.status(code.OK), ctx.json(getUser()));
  }),
];

export default handlers;
