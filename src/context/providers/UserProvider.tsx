import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../../services/apiService";
import { PropsType } from "../../types/PropsType";
import { UserContextType } from "../../types/UserContextType";
import { LocalUserType } from "../../types/LocalUserType";
import { getUser } from "../../utils/localStorage";

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: PropsType) {
  const [user, setUser] = useState<LocalUserType | null>(null);

  useEffect(() => {
    (() => {
      const localUser = getUser();
      if (localUser) {
        setUser({ ...localUser });
      }
    })();
  }, []);

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUsers = () => useContext(UserContext) as UserContextType;
