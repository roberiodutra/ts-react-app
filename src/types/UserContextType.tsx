import { SetStateAction } from "react";
import { UserLoginType } from "./UserLoginType";

export type UserContextType = {
  user: UserLoginType | null;
  setUser: React.Dispatch<SetStateAction<UserLoginType | null>>;
};
