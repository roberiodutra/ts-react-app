import { LocalUserType } from "../types/LocalUserType";

export const saveUser = (user: LocalUserType) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const value = localStorage.getItem("user");
  if (typeof value === "string") {
    return JSON.parse(value);
  }
};

export const removeUser = () => localStorage.removeItem("user");
