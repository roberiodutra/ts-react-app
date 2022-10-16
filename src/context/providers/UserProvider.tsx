import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../../services/api";
import { QuestionType } from "../../types/QuestionType";
import { PropsType } from "../../types/PropsType";
import { UserContextType } from "../../types/UserContextType";

const UserContext = createContext<UserContextType | []>([]);

export function UserProvider({ children }: PropsType) {
  const [users, setUsers] = useState<QuestionType[]>([]);

  useEffect(() => {
    (async () => {
      await apiService.getAll()
        .then(({ data }) => setUsers(data));
    })();
  }, []);

  const value = {
    users,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUsers = () => useContext(UserContext) as UserContextType;
