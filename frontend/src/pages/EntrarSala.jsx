import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pessoasImage from "../assets/amigos.svg";
import LogoMarca from "../components/LogoMarca";
import PageWrapper from "../components/PageWrapper";
import { useUser } from "../context/UseContext";
import socket from "../services/sockets";
import { api } from "../services/api";

export default function EntrarSala() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();
  const { setCodigoSala, nomeUsuario } = useUser();

  const entrarNaSala = async () => {
    try {
      const response = await api.post("/sala/entrar", {
        codigo: codigo.trim(), 
        nome: nomeUsuario || "Convidado",
        localizacao: "-3.72831,-38.53123"
      });

      const { salaId, nomeRole } = response.data;


      if (response.data.ok) {
        setNomeRole(response.data.nomeSala);
        setCodigo(codigo.trim());
        setSalaId(response.data.salaId);

        socket.emit("entrar_na_sala", {
          codigo: codigo.trim(),
          apelido: nomeUsuario || "Convidado",
        });

        navigate("/espera");
      } else {
        alert("Código inválido ou sala inexistente");
      }
    } catch (error) {
      console.error("Erro ao entrar na sala:", error);
      alert("Erro ao tentar entrar na sala.");
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center mt-2">
        <LogoMarca />
        <input
          type="text"
          placeholder="Código da sala"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full p-3 rounded-2xl bg-purple-100 text-purple-700 text-center text-sm font-pdr font-semibold focus:outline-0"
        />
        <button
          onClick={entrarNaSala}
          className="w-full p-2 bg-teal-300 hover:bg-teal-400 text-white font-bold mt-2 rounded-2xl text-lg cursor-pointer"
        >
          Entrar na sala
        </button>
      </div>
      <img
        src={pessoasImage}
        alt="Três pessoas"
        className="absolute w-90 -bottom-0"
      />
    </PageWrapper>
  );
}
