import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [codigoSala, setCodigoSala] = useState("");
  const [salaId, setSalaId] = useState(null);
  const [nomeRole, setNomeRole] = useState("");
  const [nomeConvidado, setNomeConvidado] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [sugestaoFinal, setSugestaoFinal] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        codigoSala,
        setCodigoSala,
        nomeRole,
        setNomeRole,
        nomeConvidado,
        setNomeConvidado,
        localizacao,
        setLocalizacao,
        sugestaoFinal,
        setSugestaoFinal,
        salaId,
        setSalaId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
