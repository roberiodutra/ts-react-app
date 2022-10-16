import { createContext, useContext, useMemo, useState, useEffect } from "react";

const UserContext = createContext([] as unknown);

type userProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: userProps) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (users) {
      (async () => {
        <></>;
      })();
    }
  }, []);

  const value = useMemo(
    () => ({
      users,
    }),
    [users]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUsers = () => useContext(UserContext);
