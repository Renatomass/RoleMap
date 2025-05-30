import PageWrapper from "../components/PageWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ResultadoFinal() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const votacaoFinalizada = params.get("resultado") === "true";

  const votosMock = [
    { nome: "João", voto: "✅ Aceitou" },
    { nome: "Maria", voto: "❌ Recusou" },
    { nome: "Paulo", voto: "🤔 Talvez" },
    { nome: "Julia", voto: "✅ Aceitou" },
  ];

  useEffect(() => {
    if (!votacaoFinalizada) {
      navigate("/TipoRole");
    }
  }, [votacaoFinalizada, navigate]);

  return (
    <PageWrapper>
      <div className="text-center text-white sm:mt-6 mt-14 mb-4 px-4">
        <h1 className="text-3xl font-bold">🎉 Resultado da Votação</h1>
        <p className="text-base text-gray-300 mt-1">
          A maioria decidiu por esse rolê! <br /> Aproveite e marque com a galera. 🗓️
        </p>
      </div>

      <div className="w-full h-72 sm:h-80 max-w-sm rounded-3xl shadow-2xl text-white relative overflow-hidden mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#0004ff] z-0"></div>
        <img
          src="/src/assets/restaurante.jpg"
          alt="Local escolhido"
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        />

        <div className="relative z-10 flex flex-col items-center justify-end h-full px-6 pb-2">
          <h2 className="text-2xl font-bold drop-shadow-md text-center">Bistrô Solar</h2>
          <div className="flex justify-center w-full px-0 text-base font-bold text-purple-200 mt-1">
            <span className="flex items-center gap-1">⭐ 4.5</span>
            <span className="flex items-center gap-1">📍 1,8km</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-white text-center px-6 mt-2">
        <div className="bg-[#ffffff1a] rounded-xl p-4 w-full max-w-sm mb-2">
          <h3 className="text-lg font-bold mb-2">Votos dos amigos:</h3>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {votosMock.map((amigo, i) => (
              <div key={i} className="text-sm text-left">
                <span className="font-semibold text-white">{amigo.nome}:</span> {amigo.voto}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row sm:flex-row gap-4">
          <button
            onClick={() => window.open("https://www.google.com/maps", "_blank")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer font-bold shadow-md transition-transform transform hover:scale-105"
          >
            📍 Ver no mapa
          </button>

          <button
            onClick={() => alert("Evento salvo! Em breve enviaremos por e-mail")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 cursor-pointer rounded-xl font-bold shadow-md transition-transform transform hover:scale-105"
          >
            ✅ Confirmar rolê
          </button>
        </div>

        <button
          onClick={() => navigate("/TipoRole")}
          className="mt-4 text-sm text-purple-300 font-bold hover:text-white cursor-pointer "
        >
          Fazer nova busca
        </button>
      </div>
    </PageWrapper>
  );
}
