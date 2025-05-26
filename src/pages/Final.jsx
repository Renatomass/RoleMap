import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import BtnUser from "../components/BtnUser";
import CardLocal from "../components/CardLocal";
import PopupFinal from "../components/PopupFinal";

export default function Final() {
  const navigate = useNavigate();
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const handleAceitar = () => {
    setMostrarPopup(true);

    setTimeout(() => {
      setMostrarPopup(false);
    }, 2500);
  };

  const handleRecusar = () => {
    navigate("/criarSala"); 
  };

  return (
    <PageWrapper>
      <BtnUser />

      <div className="flex flex-col items-center justify-center gap-6 mt-10 w-full px-4">
        <CardLocal
          nome="Bistrô Solar"
          imagem="/assets/restaurante.jpg" // Use caminho correto!
          nota={4.5}
          distancia="1,5km"
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAceitar}
            className="bg-teal-400 text-white font-bold py-3 px-6 rounded-xl text-lg shadow hover:scale-105 transition"
          >
            Aceitar
          </button>
          <button
            onClick={handleRecusar}
            className="bg-rose-500 text-white font-bold py-3 px-6 rounded-xl text-lg shadow hover:scale-105 transition"
          >
            Recusar
          </button>
        </div>
      </div>

      {mostrarPopup && <PopupFinal />}
    </PageWrapper>
  );
}
