import PageWrapper from "../components/PageWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UseContext";
import { api } from "../services/api";
import { error } from "../utils/logger";
import Toast from "../components/Toast";
import socket from "../services/sockets";
import ModalSchedule from "../components/ModalSchedule";
import placeholderImg from "../assets/restaurante.jpg";

export default function ResultadoFinal() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const votacaoFinalizada = params.get("resultado") === "true";
  const [toastMsg, setToastMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    votos,
    sugestaoFinal,
    salaId,
    setVotos,
    convidadoId,
    codigoSala,
    setSugestaoFinal,
    user,
    setCodigoSala,
    setSalaId,
    setNomeRole,
    setConvidadoId,
  } = useUser();

  const lugar = sugestaoFinal?.sugestao;
  const ehConvidado = convidadoId && !user;


  const votosSim = votos.filter((v) => v.voto === "sim").length;
  const votosNao = votos.filter((v) => v.voto === "nao").length;
  const empate = votosSim === votosNao;
  const maioriaSim = votosSim > votosNao;

  useEffect(() => {
    if (!votacaoFinalizada) {
      navigate("/TipoRole");
    }
  }, [votacaoFinalizada, navigate]);

  useEffect(() => {
    const obterVotos = async () => {
      if (!salaId) return;
      try {
        const resposta = await api.get(`/sala/${salaId}/votos`);
        setVotos(resposta.data);
      } catch (err) {
        error("Erro ao buscar votos:", err);
      }
    };
    obterVotos();
  }, [salaId, setVotos]);

  const tentarNovamente = async () => {
    try {
      const resposta = await api.post("/sala/sugestao", { salaId });
      setSugestaoFinal(resposta.data);
      socket.emit("enviar_sugestao", {
        codigo: codigoSala,
        sugestao: resposta.data,
      });
      navigate("/resultado");
    } catch (err) {
      error("Erro ao tentar nova sugestao:", err);
    }
  };

    const sairDoRole = () => {
    setCodigoSala("");
    setSalaId(null);
    setNomeRole("");
    setConvidadoId(null);
    setSugestaoFinal(null);
    setVotos([]);
    navigate("/Home");
  };


  return (
    <PageWrapper>
      <div className="text-center text-white sm:mt-6 mt-14 mb-4 px-4">
        <h1 className="text-3xl font-bold">🎉 Resultado da Votação</h1>
        <p className="text-base text-gray-300 mt-1">
          {empate
            ? "Empate! Clique em 'Tentar novamente' para nova sugestão."
            : maioriaSim
            ? "A maioria decidiu por esse rolê!"
            : "A maioria decidiu não ir nesse rolê."}
        </p>
      </div>

      <div className="w-full h-72 sm:h-80 max-w-sm rounded-3xl shadow-2xl text-white relative overflow-hidden mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#0004ff] z-0"></div>
        <img
          src={lugar?.imagem || placeholderImg}
          onError={(e) => {
          e.target.src = placeholderImg;
        }}
          alt="Local escolhido"
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        />

        <div className="relative z-10 flex flex-col items-center justify-end h-full px-6 pb-2">
          <h2 className="text-2xl font-bold drop-shadow-md text-center">
            {lugar?.nome || "Local escolhido"}
          </h2>
          <div className="flex justify-center w-full px-0 text-base font-bold text-purple-200 mt-1">
            <span className="flex items-center gap-1">⭐ {lugar?.nota}</span>
            <span className="flex items-center gap-1">
              📍 {lugar?.distancia}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-white text-center px-6 mt-2">
        <div className="bg-[#ffffff1a] rounded-xl p-4 w-full max-w-sm mb-2">
          <h3 className="text-lg font-bold mb-2">Votos dos amigos:</h3>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {votos.map((amigo, i) => {
              const ehUsuario = amigo.id === convidadoId;
              return (
                <div key={i} className="text-sm text-left">
                  <span className="font-semibold text-white">
                    {amigo.nome}
                    {ehUsuario ? " (você)" : ""}:
                  </span>
                  {amigo.voto === "sim" ? "✅ Aceitou " : "❌ Recusou "}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-row sm:flex-row gap-4">
          <button
            onClick={() => {
              const nome = encodeURIComponent(lugar?.nome || "");
              window.open(
                `https://www.google.com/maps/search/${nome}`,
                "_blank"
              );
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer font-bold shadow-md transition-transform transform hover:scale-105"
          >
            📍 Ver no mapa
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 cursor-pointer rounded-xl font-bold shadow-md transition-transform transform hover:scale-105"
          >
            ✅ Confirmar rolê
          </button>
        </div>

         {ehConvidado ? (
          <button
            onClick={sairDoRole}
            className="mt-4 text-sm text-purple-300 font-bold hover:text-white cursor-pointer "
          >
            Sair do rolê
          </button>
        ) : (
          <button
            onClick={tentarNovamente}
            className="mt-4 text-sm text-purple-300 font-bold hover:text-white cursor-pointer "
          >
            Tentar novamente
          </button>
        )}
      </div>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
      {showModal && (
        <ModalSchedule place={lugar} onClose={() => setShowModal(false)} />
      )}
    </PageWrapper>
  );
}
