import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../context/UseContext";
import { api } from "../services/api";
import Logo from "../assets/LOGO.svg";

export default function Esperando() {
  const navigate = useNavigate();
  const { codigoSala, setSugestaoFinal } = useUser();

  console.log("codigoSala no contexto:", codigoSala);


  useEffect(() => {
    const buscarSugestao = async () => {
      console.log("🧪 codigoSala antes do fetch:", codigoSala);
      if (!codigoSala) return;

      try {
        const response = await api.post("/sala/sugestao", {
          salaId: codigoSala,
        });

        console.log("Resposta da sugestão:", response.data);

        setSugestaoFinal(response.data);
        navigate("/resultado");
      } catch (error) {
        console.error("Erro ao buscar sugestão:", error);
      }
    };

    buscarSugestao();
  }, [codigoSala, navigate, setSugestaoFinal]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#5d2c91]">
      <div className="bg-[#402263] rounded-2xl px-10 py-16 text-center shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Ícone de localização" className="w-16 h-16" />
        </div>
        <p className="text-white text-xl font-semibold mb-6">
          Buscando o rolê perfeito...
        </p>
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
