import { useUser } from "../context/UseContext";
import PageWrapper from "../components/PageWrapper";
import BtnPrincipal from "../components/BtnPrincipal";
import PopupBuscando from "../components/PopupBuscando";
import { useState } from "react";
import Toast from "../components/Toast";
import socket from "../services/sockets";

export default function CodeRoom() {
  const { codigoSala, salaId } = useUser();

  const [buscando, setBuscando] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const iniciarBusca = () => {
    setBuscando(true);
    socket.emit("iniciar_busca", { codigo: codigoSala, salaId });
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoSala);
    setToastMsg("Código copiado!");
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center text-white gap-4">
        <h1 className="text-4xl font-bold">🎉CÓDIGO CRIADO🗺️</h1>
        <p className="text-1xl text-white/90">Compartilhe com seu amigos.</p>

        <div className="bg-[#4b2c84] animate-bounce text-4xl font-extrabold px-8 py-4 rounded-xl tracking-widest mb-10 mt-10 shadow-md">
          {codigoSala}
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
      {buscando && <PopupBuscando mostrar={buscando} />}
       {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      )}
    </PageWrapper>
  );
}
