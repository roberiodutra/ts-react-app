import axios from "axios";

enum methods { get, post, put };

async function request(path: string, method: keyof typeof methods) {
  const instance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-type": "application/json",
    },
  });

  const res = await instance[method](path);
  return res;
}

export default request;
