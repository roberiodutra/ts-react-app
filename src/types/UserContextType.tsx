import { SetStateAction } from "react";
import { LocalUserType } from "./LocalUserType";

export type UserContextType = {
  user: LocalUserType | null;
  setUser: React.Dispatch<SetStateAction<LocalUserType | null>>;
};
