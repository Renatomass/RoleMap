import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UseContext";
import PageWrapper from "../components/PageWrapper";
import BtnPrincipal from "../components/BtnPrincipal";
import PopupBuscando from "../components/PopupBuscando";
import { useState } from "react";
import { GeradorCod } from "../utils/GeradorCod";

export default function CodeRoom() {
  const navigate = useNavigate();
  const { codigoSala } = useUser();
<span className="text-white text-sm">Sala: {codigoSala}</span>


  const [buscando, setBuscando] = useState(false);
  const iniciarBusca = () => {
    setBuscando(true);
    setTimeout(() => {
      setBuscando(false);
      navigate("/resultado");
    }, 3000);
  };

  const copiarCodigo = () => {
    alert("Código copiado!");
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center text-white gap-4">
        <h1 className="text-4xl font-bold">🎉CÓDIGO CRIADO🗺️</h1>
        <p className="text-1xl text-white/90">Compartilhe com seu amigos.</p>

        <div className="bg-[#4b2c84] animate-bounce text-4xl font-extrabold px-8 py-4 rounded-xl tracking-widest mb-10 mt-10 shadow-md">
          {GeradorCod()}
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm items-center">
          <BtnPrincipal Stylo="bg-yellow-400" full onClick={copiarCodigo}>
            Copiar código
          </BtnPrincipal>
          <BtnPrincipal Stylo="bg-teal-400" full onClick={iniciarBusca}>
            Começar busca
          </BtnPrincipal>
        </div>
      </div>
      <PopupBuscando mostrar={buscando} />
    </PageWrapper>
  );
}
