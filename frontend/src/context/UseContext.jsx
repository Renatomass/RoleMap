import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [codigoSala, setCodigoSala] = useState("");
  const [salaId, setSalaId] = useState(null);
  const [nomeRole, setNomeRole] = useState("");
  const [nomeConvidado, setNomeConvidado] = useState("");
  const [convidadoId, setConvidadoId] = useState(null);
  const [localizacao, setLocalizacao] = useState("");
  const [sugestaoFinal, setSugestaoFinal] = useState(null);
  const [votos, setVotos] = useState([]);


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
        convidadoId,
        setConvidadoId,
        localizacao,
        setLocalizacao,
        sugestaoFinal,
        setSugestaoFinal,
        salaId,
        setSalaId,
        votos,
        setVotos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
