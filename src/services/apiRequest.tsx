import axios, { AxiosRequestHeaders } from "axios";
import { QuestionStatusType } from "../types/QuestionStatusType";
import { QuestionType } from "../types/QuestionType";
import { UserLoginType } from "../types/UserLoginType";
import { UserRegisterType } from "../types/UserRegisterType";

enum methods {
  get,
  post,
  put,
}

async function request(
  path: string,
  method: keyof typeof methods,
  data: {
    body?: UserLoginType | UserRegisterType | QuestionType | QuestionStatusType;
    headers?: AxiosRequestHeaders;
  }
) {
  const { body, headers } = data;
  const instance = axios.create({
    baseURL: "http://localhost:3001",
    headers,
  });

  const res = await instance[method](path, body);
  return res;
}

export default request;
