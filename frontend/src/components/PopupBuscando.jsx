import logo from "../assets/LOGO.svg";
import { useEffect } from "react";
import { useUser } from "../context/UseContext";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function PopupBuscando({ mostrar }) {
  const { salaId, setSugestaoFinal } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const buscarSugestao = async () => {
      if (!salaId) return;

      try {
        const response = await api.post("/sala/sugestao", {
          salaId,
        });

        console.log("📦 Resposta Gemini:", response.data);

        setSugestaoFinal(response.data);
        navigate("/resultado");
      } catch (error) {
        console.error("❌ Erro ao buscar sugestão:", error);
      }
    };

    buscarSugestao();
  }, [salaId, navigate, setSugestaoFinal]);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#2c1257] p-10 rounded-3xl shadow-lg flex flex-col items-center gap-6 animate-fade-in">
        <img src={logo} alt="Logo App" className="w-20 h-20" />
        <p className="text-white text-xl font-bold animate-pulse">
          Buscando o rolê perfeito...
        </p>
      </div>
    </div>
  );
}

