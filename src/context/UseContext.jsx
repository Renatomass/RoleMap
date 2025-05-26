import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [codigoSala, setCodigoSala] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser, codigoSala, setCodigoSala }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
