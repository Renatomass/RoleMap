import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [codigoSala, setCodigoSala] = useState("");
  const [nomeRole, setNomeRole] = useState("");
  const logout = () => {
  setUser(null);
  localStorage.removeItem("user"); 2
};
  return (
    <UserContext.Provider
      value={{ user, setUser, logout, codigoSala, setCodigoSala, nomeRole, setNomeRole }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
  
}
