import { useState } from "react";
import { useUser } from "../context/UseContext";
import PageWrapper from "../components/PageWrapper";
import CardLocal from "../components/CardLocal";
import Feedback from "../components/Feedback";
import ModalDigaAlgo from "../components/ModalDigaAlgo";
import placeholderImg from "../assets/restaurante.jpg";


export default function ResultadoRole() {
  const [mostrarModalDiga, setMostrarModalDiga] = useState(false);

  const { sugestaoFinal } = useUser();
  const sugestao = sugestaoFinal?.sugestao;
  console.log("🧠 sugestaoFinal:", sugestaoFinal);

  const handleEnviarMensagem = (mensagem) => {
    console.log("Mensagem enviada:", mensagem);
    setMostrarModalDiga(false);
  };

  const amigos = [
    { nome: "João", msg: "Cuida!" },
    { nome: "Maria", msg: "Paia demais!" },
    { nome: "Paulo", msg: "Sei não hein..." },
    { nome: "Julia", msg: "Partiu!" },
  ];

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
          {amigos.map((amigo, i) => (
            <Feedback key={i} nome={amigo.nome} msg={amigo.msg} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
