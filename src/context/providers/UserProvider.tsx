import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../../services/apiService";
import { QuestionType } from "../../types/QuestionType";
import { PropsType } from "../../types/PropsType";
import { UserContextType } from "../../types/UserContextType";
import { UserLoginType } from "../../types/UserLoginType";

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: PropsType) {
  const [user, setUser] = useState<UserLoginType | null>(null);

  useEffect(() => {
    (async () => {
      // await apiService.getAll().then(({ data }) => setUsers(data));
    })();
  }, []);

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUsers = () => useContext(UserContext) as UserContextType;
