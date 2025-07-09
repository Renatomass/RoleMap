import { useState, useEffect } from "react";
import { useUser } from "../context/UseContext";
import socket from "../services/sockets";
import PageWrapper from "../components/PageWrapper";
import CardLocal from "../components/CardLocal";
import Feedback from "../components/Feedback";
import ModalDigaAlgo from "../components/ModalDigaAlgo";
import placeholderImg from "../assets/restaurante.jpg";
import { api } from "../services/api";
import { log, error } from "../utils/logger";




export default function ResultadoRole() {
  const [mostrarModalDiga, setMostrarModalDiga] = useState(false);

  const {  sugestaoFinal,
    votos,
    setVotos,
    codigoSala,
    salaId,
    mensagens,
    setMensagens,
    nomeConvidado,
    user } = useUser();

  const sugestao = sugestaoFinal?.sugestao;
  log("🧠 sugestaoFinal:", sugestaoFinal);

  const handleEnviarMensagem = (mensagem) => {
      if (!mensagem) return;
    socket.emit("enviar_mensagem", {
      codigo: codigoSala,
      nome: nomeConvidado || user?.nome,
      mensagem,
    });
  };

    useEffect(() => {
    const receberVoto = (info) => {
      setVotos((prev) => [...prev, info]);
    };
    socket.on("novo_voto", receberVoto);
    if (codigoSala) {
      socket.emit("entrar_na_sala", { codigo: codigoSala });
    }
    const receberMensagem = (info) => {
      setMensagens((prev) => [...prev, info]);
    };
    socket.on("nova_mensagem", receberMensagem);
    return () => {
      socket.off("novo_voto", receberVoto);
    };
  }, [codigoSala, setVotos, setMensagens]);

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


  return (
    <PageWrapper>
      <CardLocal
        nome={sugestao?.nome}
        descricao={sugestao?.descricao}
        motivo={sugestao?.motivo}
        link={sugestao?.link}
        imagem={sugestao?.imagem || placeholderImg}
        nota={sugestao?.nota}
        distancia={sugestao?.distancia ? `${sugestao.distancia} ` : ""}
      />

      <div className="mt-4 text-center">
        <p className="text-2xl font-semibold mb-2">O que você achou?</p>
        <div className="flex flex-row justify-center gap-2 flex-wrap">
          <button className="px-3 py-1 bg-[#15128598] rounded-full text-sm hover:scale-105 transition cursor-pointer">
            🤬 Não gostei!
          </button>

          <button
            onClick={() => setMostrarModalDiga(true)}
            className="px-3 py-1 bg-[#15128598] rounded-full text-sm hover:scale-105 transition cursor-pointer font-pdr"
          >
            💭 Diga algo
          </button>

          <button className="px-3 py-1 bg-[#15128598] rounded-full text-sm hover:scale-105 transition cursor-pointer">
            😎 Partiu!
          </button>
        </div>

        {mostrarModalDiga && (
          <ModalDigaAlgo
            onFechar={() => setMostrarModalDiga(false)}
            onEnviar={handleEnviarMensagem}
          />
        )}
      </div>

      <div className="w-full max-w-md ml-2 mt-6">
        <div className="flex flex-wrap justify-around gap-2">
          {mensagens.map((m, i) => (
            <Feedback key={i} nome={m.nome} msg={m.mensagem} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
